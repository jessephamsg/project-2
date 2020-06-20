const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const START_DATE = '2020-01-05';
const CLASS_FREQ_IN_MILISEC = 7 * 8.64e+7;
const WEEKS_IN_A_YEAR = 52;

const createClassTimetable = () => {
    const parsedDate = Date.parse(START_DATE);
    const timeTable = [parsedDate];
    for (let i = 0; i <= WEEKS_IN_A_YEAR; i++) {
        timeTable.push(timeTable[timeTable.length - 1] + CLASS_FREQ_IN_MILISEC);
    };
    const stringTimeTable = timeTable.map(date => new Date(date).toISOString().slice(0, 10))
    return stringTimeTable;
}

const attendancePropertyBuilder = () => {
    const attendanceArr = [];
    const timeTable = createClassTimetable();
    for (const classDate of timeTable) {
        attendanceArr.push({
            date: classDate,
            isPresent: false,
        })
    };
    return attendanceArr
}

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
            address: studentObject.address,
            region: studentObject.region,
            attendance: attendancePropertyBuilder()
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
            "attendance.date": dataForUpdate
        }, {
            $set: {
                "attendance.$.isPresent": true
            }
        })
        return student;
    },
    async getAllByRegions(regionName) {
        const students = await db.studentRecords.find({
            region: regionName,
        }).toArray();
        return students
    },
    async getManyByAgeGroup() {

    },
    async getManyByAttendanceRate() {

    }
}
