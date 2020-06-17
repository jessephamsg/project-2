const db = require('../database/db');

module.exports = {
    async addOne (studentObject) {
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
        });
        const studentDetails = await studentPersonalDetails.ops[0]
        return studentDetails;
    },
    async getAll () {
        const studentData = await db.studentRecords.find().toArray();
        return studentData;
    }, 
    async getAllByAgeGroup (ageGroupQuery) {
        const studentData = await db.studentRecords.find({
            ageGroup: ageGroupQuery
        }).toArray();
        return studentData;
    },
    async getOneByID (studentObjectID) { //use when retrieving infor for editing

    },
    async editOneByID () { //use when editing one record of choice

    },
    async getManyByRegions () {

    },
    async getManyByAgeGroup () {

    },
    async getManyByAttendanceRate () {

    }
}
