const repositories = require('../repositories');
const Student = require('../formatter/Student');
const START_DATE = '2020-01-05';
const CLASS_FREQ_IN_MILISEC = 7 * 8.64e+7;
const WEEKS_IN_A_YEAR = 52;

const buildStudentObject = ({ _id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, address, region, attendance, attendanceSummary, firstSeen, lastSeen, isRegular, teacherIC, age }) => {
    return new Student(_id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, address, region, attendance, attendanceSummary, firstSeen, lastSeen, isRegular, teacherIC, age);
}

module.exports = {
    async getStudentsByAgeGroup(ageGroup) {
        const studentData = await repositories.studentRepo.getAllByAgeGroup(ageGroup);
        const students = studentData.map(student => { return buildStudentObject(student) });
        return students;
    },
    async createNewStudent(studentDetails) {
        const studentData = await repositories.studentRepo.addOne(studentDetails);
        const student = await buildStudentObject(studentData);
        return student;
    },
    createClassTimetable() {
        const parsedDate = Date.parse(START_DATE);
        const timeTable = [parsedDate];
        for (let i = 0; i <= WEEKS_IN_A_YEAR; i++) {
            timeTable.push(timeTable[timeTable.length - 1] + CLASS_FREQ_IN_MILISEC);
        };
        const stringTimeTable = timeTable.map(date => new Date(date).toISOString().slice(0, 10))
        return stringTimeTable;
    },
    async updateStudentAttendanceById(studentID, dataForUpdate) {
        const studentData = await repositories.studentRepo.updateOneAttendanceArrayByID(studentID, dataForUpdate);
        const student = await buildStudentObject(studentData);
        return student;
    },
    async getStudentsByRegion(regionQuery) {
        const studentData = await repositories.studentRepo.getAllByRegions(regionQuery);
        const students = studentData.map(student => { return buildStudentObject(student) });
        return students;
    },
    async sumAttendance (ageQuery) {
        const aggregatedAttendance = await repositories.studentRepo.sumAttendanceByDateAndAgeGroup(ageQuery);
        return aggregatedAttendance
    },
    async sumAttendanceByRegion (regionQuery) {
        const aggregatedAttendance = await repositories.studentRepo.sumAttendanceByDateAndRegion(regionQuery);
        return aggregatedAttendance
    },
    async sumRegularsByAge (ageQuery, regularValue) {
        const regulars = await repositories.studentRepo.getAllTrueRegularByAgeGroup(ageQuery, regularValue);
        return regulars
    },
    async sumRegularsByRegion (regionQuery, regularValue) {
        const regulars = await repositories.studentRepo.getAllTrueRegularByAgeGroup(regionQuery, regularValue);
        return regulars
    }
}

