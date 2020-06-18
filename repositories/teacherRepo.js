const db = require('../database/db');

module.exports = {
    async addOne (teacherObject) {
        const teacherPersonalDetails = await db.teacherRecords.insertOne({
            firstName: teacherObject.firstName,
            lastName: teacherObject.lastName,
            dob: teacherObject.dob,
            ageGroup: teacherObject.ageGroup,
        });
        const teacherDetails = await teacherPersonalDetails.ops[0]
        return teacherDetails;
    },
    async getAllByAgeGroup(ageGroupQuery) {
        await this.addDateFieldsToAllData();
        await this.addAgeFieldToAllData();
        const teacherData = await db.teacherRecords.find({
            ageGroup: ageGroupQuery
        }).toArray();
        return teacherData;
    },
}