const repositories = require('../repositories');
const Teacher = require('../formatter/Teacher');

const buildTeacherObject = ({ id, firstName, lastName, dob, ageGroup, contactNumber, address, region }) => {
    return new Teacher(id, firstName, lastName, dob, ageGroup, contactNumber, address, region);
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
    },
    async getTeachersByRegion (regionQuery) {
        const teacherData = await repositories.teacherRepo.getAllByRegion(regionQuery);
        const teachers = teacherData.map(teacher => {return buildTeacherObject(teacher)});
        return teachers;
    }
}

