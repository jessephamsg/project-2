const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const teacherObjectBuilder = require('./helpers/teacherObjectBuilder');
const calendarHelper = require('./helpers/calendar');
const analyticsHelper = require('./helpers/analytics');


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
                        startDateInDateFormat: teacher.startDateInDateFormat,
                        startWeek: calendarHelper.convertDateToWeek(teacher.startDate)
                    }
                })
        }
        return teachers;
    },
    async updateYearsOfExperience() {
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
                    },
                })
        }
        return teachers
    },
    async updateStaffRosters(rosterArr) {
        for (const arr of rosterArr) {
            const teacher = await db.teacherRecords.update({
                _id: ObjectId(arr.id),
                'roster.date': arr.date
            }, {
                    $set: {
                        'roster.$.isRostered': true,
                        'roster.$.timing': [],
                        'attendanceSummary': []
                    }
                });
        }
        for (const arr of rosterArr) {
            const teacher = await db.teacherRecords.update({
                _id: ObjectId(arr.id),
                'roster.date': arr.date
            }, {
                    $push: {
                        'roster.$.timing': arr.timing,
                        'attendanceSummary': `${arr.timing}:${arr.date}:${arr.id}`
                    }
                });
        }
        const teachers = await db.teacherRecords.find().toArray();
        await this.updateBandWidth();
        return teachers
    },
    async aggregateAllAttendanceSummary(ageGroupQuery) {
        const students = await db.teacherRecords.find({
            ageGroup: ageGroupQuery,
            $where: 'this.attendanceSummary.length > 0'
        }).toArray();
        return students;
    },
    async updateBandWidth() {
        const teachingFreq = await db.teacherRecords.aggregate([
            {
                $project: {
                    'teachingFreq': { $size: '$attendanceSummary' }
                }
            }
        ]).toArray();
        const startWeekArr = await db.teacherRecords.aggregate([
            {
                $project: {
                    'startWeek': '$startWeek'
                }
            }
        ]).toArray();
        let index = 0;
        for (const freq of teachingFreq) {
            const teachingFreq = analyticsHelper.calculateAttendanceFreq(startWeekArr[index].startWeek, freq.teachingFreq);
            await db.teacherRecords.updateOne({
                _id: ObjectId(freq['_id'])
            }, {
                    $set: {
                        'currentBandWidth': teachingFreq
                    }
                })
            index++
        }
        return teachingFreq
    },
    async getTeachersByRole(roleQuery) {
        const teachers = db.teacherRecords.find({
            role: roleQuery
        }).toArray();
        return teachers
    }
}