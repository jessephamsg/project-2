const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const teacherObjectBuilder= require('./helpers/teacherObjectBuilder')


module.exports = {
    async addOne(teacherObject) {
        const newTeacher = teacherObjectBuilder.buildTeacherObject(teacherObject)
        const teacherPersonalDetails = await db.teacherRecords.insertOne(newTeacher);
        await this.addDateFieldsToAllData();
        await this.updateYearsOfExperience();
        const teacherDetails = await teacherPersonalDetails.ops[0]
        return teacherDetails;
    },
    async getAllByAgeGroup(ageGroupQuery) {
        const teacherData = await db.teacherRecords.find({
            ageGroup: ageGroupQuery
        }).toArray();
        return teacherData;
    },
    async getAllByRegion(regionQuery) {
        const teacherData = await db.teacherRecords.find({
            region: regionQuery
        }).toArray();
        return teacherData;
    },
    async addDateFieldsToAllData() {
        const teachers = await db.teacherRecords.aggregate([
            {
                $addFields: {
                    startDateInDateFormat: {
                        $dateFromString: {
                            dateString: '$startDate',
                            format: '%Y-%m-%d'
                        }
                    }
                }
            }
        ]).toArray();
        for (const teacher of teachers) {
            const updateRecord = await db.teacherRecords.updateOne({
                _id: ObjectId(teacher['_id'])
            }, {
                $set: {
                    startDateInDateFormat: teacher.startDateInDateFormat
                }
            })
        }
        return teachers;
    },
    async updateYearsOfExperience () {
        const teachers = await db.teacherRecords.aggregate([{
            $project: {
                yearsOfExperience: {
                    $subtract: [new Date(), '$startDateInDateFormat']
                }
            }
        }]).toArray();
        for (const teacher of teachers) {
            const updateRecord = await db.teacherRecords.updateOne({
                _id: ObjectId(teacher['_id'])
            }, {
                $set: {
                    yearsOfExperience: teacher.yearsOfExperience
                }
            })
        }
        return teachers
    }
}