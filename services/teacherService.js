const repositories = require('../repositories');
const Teacher = require('../formatter/Teacher');

const buildTeacherObject = ({ _id, firstName, lastName, dob, ageGroup, contactNumber, address, region, role, startDate, yearsOfExperience, assignedChildren, roster, isAtFullCapacity, attendanceSummary, currentBandWidth }) => {
    return new Teacher(_id, firstName, lastName, dob, ageGroup, contactNumber, address, region, role, startDate, yearsOfExperience, assignedChildren, roster, isAtFullCapacity, attendanceSummary, currentBandWidth);
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
    async getTeachersByRegion(regionQuery) {
        const teacherData = await repositories.teacherRepo.getAllByRegion(regionQuery);
        const teachers = teacherData.map(teacher => { return buildTeacherObject(teacher) });
        return teachers;
    },
    async setStaffRoster(rosterArr) {
        const updatedTeacherData = await repositories.teacherRepo.updateStaffRosters(rosterArr);
        const teachers = updatedTeacherData.map(teacher => { return buildTeacherObject(teacher) });
        return teachers
    },
    async getAggregatedRoster(ageGroup) {
        const teacherData = await repositories.teacherRepo.aggregateAllAttendanceSummary(ageGroup);
        const teachers = teacherData.map(teacher => { return buildTeacherObject(teacher) });
        return teachers
    },
    async getTeachersByRole(roleQuery) {
        const teacherData = await repositories.teacherRepo.getTeachersByRole(roleQuery);
        const teachers = teacherData.map(teacher => { return buildTeacherObject(teacher) });
        return teachers
    },
    async getTeacherByID(teacherID) {
        const teacherData = await repositories.teacherRepo.getTeacherByID(teacherID);
        const teacher = await buildTeacherObject(teacherData);
        return teacher
    },
    async updateTeacherByID(teacherID, updatedObject) {
        const teacherData = await repositories.teacherRepo.updateTeacherPersonalAndRosterDetailByID(teacherID, updatedObject);
        return teacherData
    },
    async deleteTeacherByID(teacherID) {
        const teacher = await repositories.teacherRepo.deleteTeacherByID(teacherID);
        return teacher
    }
}

