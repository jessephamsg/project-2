const repositories = require('../repositories');
const Student = require('../formatter/Student');

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
    }
}

