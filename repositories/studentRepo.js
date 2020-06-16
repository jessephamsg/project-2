const db = require('../database/db');

module.exports = {
    async addOne (studentObject) {
        const studentPersonalDetails = await db.studentRecords.insertOne({
            firstName: studentObject.firstName,
            lastName: studentObject.lastName,
            dob: studentObject.dob,
            guardianName: studentObject.guardianName,
            guardianContact: studentObject.guardianContact,
            guardianRole: studentObject.guardianRole,
            membership: studentObject.membership,
            attendance: 1,
        });
        const studentDetails = await studentPersonalDetails.ops[0]
        return studentDetails;
    },
    async getAll () {
        const studentData = await db.studentRecords.find().toArray();
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
