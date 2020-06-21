const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const studentObjectBuilder = require('./helpers/studentObjectBuilder');
const calendarHelper = require('./helpers/calendar');
const analyticsHelper = require('./helpers/analytics')


module.exports = {
    async addOne(studentObject) {
        const newStudent = studentObjectBuilder.buildStudentObject(studentObject);
        const studentPersonalDetails = await db.studentRecords.insertOne(newStudent);
        const studentDetails = await studentPersonalDetails.ops[0]
        return studentDetails;
    },
    async getAll() {
        const studentData = await db.studentRecords.find().toArray();
        return studentData;
    },
    async getAllByAgeGroup(ageGroupQuery) {
        await this.addDateFieldsToAllData();
        await this.addAgeFieldToAllData();
        const studentData = await db.studentRecords.find({
            ageGroup: ageGroupQuery
        }).toArray();
        return studentData;
    },
    async addDateFieldsToAllData() {
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
    },
    async addAgeFieldToAllData() {
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
    },
    async getOneByID(studentObjectID) {
        const student = await db.studentRecords.findOne({
            _id: ObjectId(studentObjectID)
        })
        return student
    },
    async updateOneAttendanceArrayByID(studentObjectID, dataForUpdate) {
        const student = await db.studentRecords.update({
            _id: ObjectId(studentObjectID),
            "attendance.date": dataForUpdate
        }, {
                $set: {
                    "attendance.$.isPresent": true
                }
            });
        await db.studentRecords.update({
            _id: ObjectId(studentObjectID),
        }, {
                $push: { attendanceSummary: dataForUpdate }
            });
        await this.updateFirstSeenDateValue();
        await this.updateLastSeenDateValue();
        await this.updateIsRegularValue();
        return student;
    },
    async getAllByRegions(regionName) {
        const students = await db.studentRecords.find({
            region: regionName,
        }).toArray();
        return students
    },
    async updateFirstSeenDateValue() {
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
    },
    async updateLastSeenDateValue() {
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
    },
    async sumAttendanceByDateAndRegion(regionQuery) {
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
    },
    async getAllTrueRegularByAgeGroup (ageQuery, regularValue) {
        const regulars = await db.studentRecords.find({
            isRegular: regularValue,
            ageGroup: ageQuery
        }).toArray();
        const total = await regulars.length;
        return total
    },
    async getAllTrueRegularByRegion (regionQuery, regularValue) {
        const regulars = await db.studentRecords.find({
            isRegular: regularValue,
            ageGroup: regionQuery
        }).toArray();
        const total = await regulars.length;
        return total
    },
}
