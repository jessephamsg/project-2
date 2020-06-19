const repositories = require('../repositories');
const Student = require('../formatter/Student');
const START_DATE = '2020-05-01'

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
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
    async createClassTimetable () {
        //parse string into date, plus 7 then save into array as string, then render in form
    }
}

