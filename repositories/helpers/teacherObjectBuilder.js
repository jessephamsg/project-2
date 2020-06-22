const calendar = require('./calendar');

const rosterBuilder = () => {
    const rosterArr = [];
    const timeTable = calendar.createClassTimetable();
    for (const classDate of timeTable) {
        rosterArr.push({
            date: classDate,
            isRostered: false,
        })
    };
    return rosterArr
}

module.exports = {
    buildTeacherObject(teacherObject) {
        const newTeacher = {
            firstName: teacherObject.firstName,
            lastName: teacherObject.lastName,
            dob: teacherObject.dob,
            ageGroup: teacherObject.ageGroup,
            contactNumber: teacherObject.contactNumber,
            address: teacherObject.address,
            region: teacherObject.region,
            role: teacherObject.role,
            startDate: teacherObject.startDate,
            yearsOfExperience: 0,
            assignedChildren: [],
            roster: rosterBuilder(),
            isAtFullCapacity: false,
        };
        return newTeacher;
    }
}