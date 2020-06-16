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
    }
}
