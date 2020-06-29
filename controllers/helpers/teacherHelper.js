const services = require('../../services');
const DAILY_MANPOWER = 5;
const TIMESLOTS = ['10-12PM', '2-4PM', '5-7PM'];


module.exports = {
    async getTeacherDataByAgeGroup(req, res, ageQuery) {
        const dailyManpower = DAILY_MANPOWER;
        const slots = TIMESLOTS;
        const timeTable = services.studentService.createClassTimetable();
        try {
            const teacherData = await services.teacherService.getTeachersByAgeGroup(ageQuery);
            const students = await services.teacherService.getAggregatedRoster(ageQuery)
            const rosterIDArr = [];
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
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
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
        try {
            const updatedTeacherData = await services.teacherService.setStaffRoster(rosterArr);
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async showTeacherByAgeGroup(req, res, ageQuery) {
        try {
            const teacherData = await services.teacherService.getTeachersByAgeGroup(ageQuery);
            res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
                data: teacherData
            });
        } catch {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async showTeacherByRegion(req, res, regionQuery) {
        try {
            const teacherData = await services.teacherService.getTeachersByRegion(regionQuery);
            res.render('app-teacherDb/admin-teacher-region.ejs', {
                data: teacherData
            });
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    }
}