const services = require('../../services');


module.exports = {
    async getTeacherDataByAgeGroup(req, res, ageQuery) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup(ageQuery);
        const dailyManpower = 5;
        const slots = ['10-12PM', '2-4PM', '5-7PM'];
        console.log(teacherData)
        const timeTable = services.studentService.createClassTimetable();
        const students = await services.teacherService.getAggregatedRoster(ageQuery)
        const rosterIDArr = [];
        console.log(students)
        for (const student of students) {
            const attendance = student.attendanceSummary;
            rosterIDArr.push(attendance);
        }
        const rosterArr = rosterIDArr.flat();
        res.render('app-teacherDb/admin-teacher-roster.ejs', {
            timeTable,
            data: teacherData,
            manpower: dailyManpower,
            timeslots: slots,
            rosterArr
        })
    },
    async updateTeacherRoster(req, res) {
        const roster = req.body.rosteredTeacher
        const filteredRoster = roster.filter(rosterDateAndID => rosterDateAndID.length > 10);
        const rosterArr = []
        for (const roster of filteredRoster) {
            const rosterObject = {
                date: roster.substr(2, 10),
                id: roster.substring(13),
                timing: roster.substr(0, 1)
            }
            rosterArr.push(rosterObject);
        }
        const updatedTeacherData = await services.teacherService.setStaffRoster(rosterArr);
    },
    async showTeacherByAgeGroup(req, res, ageQuery) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup(ageQuery);
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showTeacherByRegion(req, res, regionQuery) {
        const teacherData = await services.teacherService.getTeachersByRegion(regionQuery);
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    }
}