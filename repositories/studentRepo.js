const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const studentObjectBuilder = require('./helpers/studentObjectBuilder');


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
            $push: {attendanceSummary: dataForUpdate}
        });
        this.updateFirstSeenDateValue();
        this.updateLastSeenDateValue();
        return student;
    },
    async getAllByRegions(regionName) {
        const students = await db.studentRecords.find({
            region: regionName,
        }).toArray();
        return students
    },
    async updateFirstSeenDateValue () {
        const students = await db.studentRecords.aggregate([
            {
                $project: {
                    "firstSeen.date": {$arrayElemAt: ['$attendanceSummary', 0]}
                }
            }
        ]).toArray();
        for (const student of students) {
            await db.studentRecords.updateOne({
                _id: ObjectId(student['_id'])
            }, {
                $set: {
                    "firstSeen.date": student.firstSeen.date
                }
            });  
        }
        return students;
    },
    async updateLastSeenDateValue () {
        const students = await db.studentRecords.aggregate([
            {
                $project: {
                    "lastSeen.date": {$arrayElemAt: ['$attendanceSummary', -1]}
                }
            }
        ]).toArray();
        for (const student of students) {
            await db.studentRecords.updateOne({
                _id: ObjectId(student['_id'])
            }, {
                $set: {
                    "lastSeen.date": student.lastSeen.date
                }
            });  
        }
        return students;
    }
}
