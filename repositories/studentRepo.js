const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    async addOne(studentObject) {
        const studentPersonalDetails = await db.studentRecords.insertOne({
            firstName: studentObject.firstName,
            lastName: studentObject.lastName,
            dob: studentObject.dob,
            ageGroup: studentObject.ageGroup,
            guardianName: studentObject.guardianName,
            guardianContact: studentObject.guardianContact,
            guardianRole: studentObject.guardianRole,
            membership: studentObject.membership,
            firstSeen: studentObject.firstSeen,
            attendance: []
        });
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
        }, {
            $push: {
                attendance: dataForUpdate
            }
        })
        return student;
    },
    async getManyByRegions() {

    },
    async getManyByAgeGroup() {

    },
    async getManyByAttendanceRate() {

    }
}
