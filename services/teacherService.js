const repositories = require('../repositories');
const Teacher = require('../formatter/Teacher');

const buildTeacherObject = ({ id, firstName, lastName, dob, ageGroup, contactNumber}) => {
    return new Teacher(id, firstName, lastName, dob, ageGroup, contactNumber);
}

module.exports = {
    async getTeachersByAgeGroup(ageGroup) {
        const teacherData = await repositories.teacherRepo.getAllByAgeGroup(ageGroup);
        const teachers = teacherData.map(teacher => { return buildTeacherObject(teacher) });
        return teachers;
    },
    async createNewTeacher(teacherDetails) {
        const teacherData = await repositories.teacherRepo.addOne(teacherDetails);
        const teacher = await buildTeacherObject(teacherData);
        return teacher;
    }
}

