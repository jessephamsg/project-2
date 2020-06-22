const calendar = require('./calendar');

const attendancePropertyBuilder = () => {
    const attendanceArr = [];
    const timeTable = calendar.createClassTimetable();
    for (const classDate of timeTable) {
        attendanceArr.push({
            date: classDate,
            isPresent: false,
        })
    };
    return attendanceArr
}

module.exports = {
    buildStudentObject(studentObject) {
        const newStudent = {
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
            attendance: attendancePropertyBuilder(),
            attendanceSummary: [],
            firstSeen: {
                date: '',
                week: 0
            },
            lastSeen: {
                date: '',
                week: 0
            },
            isRegular: true,
            teacherIC: {
                _id: '',
            }
        };
        return newStudent;
    }
}