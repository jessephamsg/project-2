const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const studentObjectBuilder = require('./helpers/studentObjectBuilder');
const calendarHelper = require('./helpers/calendar');
const analyticsHelper = require('./helpers/analytics')


module.exports = {
    async addOne(studentObject) {
        const newStudent = studentObjectBuilder.buildStudentObject(studentObject);
        try {
            const studentPersonalDetails = await db.studentRecords.insertOne(newStudent);
            await Promise.all([
                this.addDateFieldsToAllData(),
                this.addAgeFieldToAllData()
            ]);
            const studentDetails = await studentPersonalDetails.ops[0]
            return studentDetails;
        } catch (err) {
            throw new Error(`Database error: new student object cannot be created due to the following error ${err.message}`)
        }
    },
    async getAll() {
        try {
            const studentData = await db.studentRecords.find().toArray();
            return studentData;
        } catch (err) {
            throw new Error(`Database error: cannot get all students due to the following error ${err.message}`)
        }
    },
    async getAllByAgeGroup(ageGroupQuery) {
        try {
            await Promise.all([
                this.addDateFieldsToAllData(),
                this.addAgeFieldToAllData(),
                this.updateFirstSeenDateValue(),
                this.updateLastSeenDateValue(),
                this.updateIsRegularValue()
            ]);
            const studentData = await db.studentRecords.find({
                ageGroup: ageGroupQuery
            }).toArray();
            return studentData;
        } catch (err) {
            throw new Error(`Database error: cannot get all students by age group due to the following error ${err.message}`)
        }
    },
    async addDateFieldsToAllData() {
        try {
            const students = await db.studentRecords.aggregate([
                {
                    $addFields: {
                        dobDateFormat: {
                            $dateFromString: {
                                dateString: '$dob',
                                format: '%Y-%m-%d'
                            }
                        }
                    }
                }
            ]).toArray();
            students.forEach(student => {
                db.studentRecords.save(student)
            })
            return students;
        } catch (err) {
            throw new Error(`Database error: cannot add Date field property to student objects due to the following error ${err.message}`)
        }
    },
    async addAgeFieldToAllData() {
        try {
            const students = await db.studentRecords.aggregate([
                {
                    $addFields: {
                        age: {
                            $subtract: [new Date(), "$dobDateFormat"]
                        }
                    }
                }
            ]).toArray();
            students.forEach(student => {
                db.studentRecords.save(student);
            })
            return students;
        } catch (err) {
            throw new Error(`Database error: cannot calculate Age property for student objects due to the following error: ${err.message}`)
        }
    },
    async getOneByID(studentObjectID) {
        try {
            const student = await db.studentRecords.findOne({
                _id: ObjectId(studentObjectID)
            })
            return student
        } catch (err) {
            throw new Error(`Database error: cannot get student object with ID number ${studentObjectID} due to the following error: ${err.message}`)
        }
    },
    async updateOneAttendanceArrayByID(studentObjectID, dataForUpdate) {
        try {
            const student = await db.studentRecords.update({
                _id: ObjectId(studentObjectID),
                "attendance.date": dataForUpdate
            }, {
                    $set: {
                        "attendance.$.isPresent": true
                    }
                });
            await Promise.all([
                db.studentRecords.update({
                    _id: ObjectId(studentObjectID),
                }, {
                        $push: { attendanceSummary: dataForUpdate }
                    }),
                this.updateFirstSeenDateValue(),
                this.updateLastSeenDateValue(),
                this.updateIsRegularValue()
            ]);
            return student;
        } catch (err) {
            throw new Error(`Database error: cannot update attendance array of student object ${studentObjectID} due to the following error: ${err.message}`)
        }
    },
    async getAllByRegions(regionName) {
        try {
            const students = await db.studentRecords.find({
                region: regionName,
            }).toArray();
            return students
        } catch (err) {
            throw new Error(`Database error: cannot get all students of the region ${regionName} due to the following error: ${err.message}`)
        }
    },
    async updateFirstSeenDateValue() {
        try {
            const students = await db.studentRecords.aggregate([
                {
                    $project: {
                        "firstSeen.date": { $arrayElemAt: ['$attendanceSummary', 0] }
                    }
                }
            ]).toArray();
            for (const student of students) {
                await db.studentRecords.updateOne({
                    _id: ObjectId(student['_id'])
                }, {
                        $set: {
                            "firstSeen.date": student.firstSeen.date,
                            "firstSeen.week": calendarHelper.convertDateToWeek(student.firstSeen.date)
                        }
                    });
            }
            return students;
        } catch (err) {
            throw new Error(`Database error: cannot update firstSeen value of all student objects due to the following error ${err.message}`)
        }
    },
    async updateLastSeenDateValue() {
        try {
            const students = await db.studentRecords.aggregate([
                {
                    $project: {
                        "lastSeen.date": { $arrayElemAt: ['$attendanceSummary', -1] }
                    }
                }
            ]).toArray();
            for (const student of students) {
                await db.studentRecords.updateOne({
                    _id: ObjectId(student['_id'])
                }, {
                        $set: {
                            "lastSeen.date": student.lastSeen.date,
                            "lastSeen.week": calendarHelper.convertDateToWeek(student.lastSeen.date)
                        }
                    });
            }
            return students;
        } catch (err) {
            throw new Error(`Database error: cannot update Last seen value of all student objects due to the following error: ${err.message}`)
        }
    },
    async updateIsRegularValue() {
        const attendanceFreq = await db.studentRecords.aggregate([
            {
                $project: {
                    "attedanceFreq": { $size: '$attendanceSummary' }
                }
            }
        ]).toArray();
        const firstSeenWeekArr = await db.studentRecords.aggregate([
            {
                $project: {
                    'firstSeenWeek': '$firstSeen.week'
                }
            }
        ]).toArray();
        let index = 0;
        for (const freq of attendanceFreq) {
            const attendanceFreq = analyticsHelper.calculateAttendanceFreq(firstSeenWeekArr[index].firstSeenWeek, freq.attedanceFreq);
            if (attendanceFreq >= 0.5) {
                await db.studentRecords.updateOne({
                    _id: ObjectId(freq['_id'])
                }, {
                        $set: {
                            "isRegular": true
                        }
                    })
            } else {
                await db.studentRecords.updateOne({
                    _id: ObjectId(freq['_id'])
                }, {
                        $set: {
                            "isRegular": false
                        }
                    })
            }
            index++
        }
        return attendanceFreq
    },
    async sumAttendanceByDateAndAgeGroup(ageQuery) {
        try {
            const dates = calendarHelper.createClassTimetable();
            const allAttendance = [];
            for (const classDate of dates) {
                const results = await db.studentRecords.find({
                    "attendance": { date: classDate, isPresent: true },
                    ageGroup: ageQuery
                }).toArray();
                const allStudentsAttending = results.length;
                allAttendance.push({
                    date: classDate,
                    allAttendance: allStudentsAttending
                })
            }
            return allAttendance;
        } catch (err) {
            throw new Error(`Database error: cannot get total attendance by date for ${ageQuery} due to the following error: ${err.message}`)
        }
    },
    async sumAttendanceByDateAndRegion(regionQuery) {
        try {
            const dates = calendarHelper.createClassTimetable();
            const allAttendance = [];
            for (const classDate of dates) {
                const results = await db.studentRecords.find({
                    "attendance": { date: classDate, isPresent: true },
                    region: regionQuery
                }).toArray();
                const allStudentsAttending = results.length;
                allAttendance.push({
                    date: classDate,
                    allAttendance: allStudentsAttending
                })
            }
            return allAttendance;
        } catch (err) {
            throw new Error(`Database error: cannot get total attendance by date for ${regionQuery} due to the following error: ${err.message}`)
        }
    },
    async getAllTrueRegularByAgeGroup(ageQuery, regularValue) {
        try {
            const regulars = await db.studentRecords.find({
                isRegular: regularValue,
                ageGroup: ageQuery
            }).toArray();
            const total = await regulars.length;
            return total
        } catch (err) {
            throw new Error(`Database error: cannot get total regular for ${ageQuery} due to the following error: ${err.message}`)
        }
    },
    async getAllTrueRegularByRegion(regionQuery, regularValue) {
        try {
            const regulars = await db.studentRecords.find({
                isRegular: regularValue,
                region: regionQuery
            }).toArray();
            const total = await regulars.length;
            return total
        } catch (err) {
            throw new Error(`Database error: cannot get total regular for ${regionQuery} due to the following error: ${err.message}`)
        }
    },
    async updateStudentProfileByID(studentID, updatedObject) {
        try {
            const updatedStudentInfo = studentObjectBuilder.buildStudentObject(updatedObject);
            const student = await db.studentRecords.updateOne({
                _id: ObjectId(studentID)
            }, {
                    $set: updatedStudentInfo
                });
            const dateArray = updatedObject.isPresent;
            dateArray.forEach(async dateValue => {
                await this.updateOneAttendanceArrayByID(studentID, dateValue)
            });
            await Promise.all([
                this.updateFirstSeenDateValue(),
                this.updateLastSeenDateValue(),
                this.updateIsRegularValue()
            ]);
            const updatedStudent = await db.studentRecords.find({ _id: ObjectId(studentID) }).toArray();
            return updatedStudent
        } catch (err) {
            throw new Error(`Database error: cannot update the profile of student ${studentID} due to the following error: ${err.message}`)
        }
    },
    async removeStudentByID(studentID) {
        try {
            const student = await db.studentRecords.deleteOne({
                _id: ObjectId(studentID)
            });
            return student
        } catch (err) {
            throw new Error(`Database error: cannot remove student with ID ${studentID} due to the following error: ${err.message}`)
        }
    }
}
