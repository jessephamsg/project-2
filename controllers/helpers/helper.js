const services = require('../../services');

module.exports = {
    async renderStudentPageByAge(req, res, ageQuery) {
        try {
            const [
                childrenData,
                regulars,
                irregulars
            ] = await Promise.all([
                services.studentService.getStudentsByAgeGroup(ageQuery),
                services.studentService.sumRegularsByAge(ageQuery, true),
                services.studentService.sumRegularsByAge(ageQuery, false)
            ])
            res.render('app-studentDb/admin-ageGroups.ejs', {
                data: childrenData,
                regulars,
                irregulars
            });
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async renderAttendanceForm(req, res, ageQuery) {
        const timeTable = services.studentService.createClassTimetable();
        try {
            const childrenData = await services.studentService.getStudentsByAgeGroup(ageQuery);
            res.render('app-studentDb/admin-attendance.ejs', {
                data: childrenData,
                dates: timeTable,
            })
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async updateAttendanceStats(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        try {
            studentsPresent.forEach(async student => {
                await services.studentService.updateStudentAttendanceById(student, datePresent);
            })
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async renderAttendanceSummary(req, res, ageQuery) {
        try {
            const [
                childrenData,
                aggregatedAttendance
            ] = await Promise.all([
                services.studentService.getStudentsByAgeGroup(ageQuery),
                services.studentService.sumAttendance(ageQuery)
            ])
            const timeTable = services.studentService.createClassTimetable();
            res.render('app-studentDb/admin-attendance-summary.ejs', {
                data: childrenData,
                dates: timeTable,
                totalAttendance: aggregatedAttendance
            })
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async renderStudentPageByRegion(req, res, regionQuery) {
        try {
            const [
                childrenData,
                regulars,
                irregulars
            ] = await Promise.all([
                services.studentService.getStudentsByRegion(regionQuery),
                services.studentService.sumRegularsByRegion(regionQuery, true),
                services.studentService.sumRegularsByRegion(regionQuery, false)
            ])
            res.render('app-studentDb/admin-regions.ejs', {
                data: childrenData,
                regulars,
                irregulars
            });
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    async renderRegionalAttendanceStats(req, res, regionQuery) {
        try {
            const [
                childrenData,
                aggregatedAttendance
            ] = await Promise.all([
                services.studentService.getStudentsByRegion(regionQuery),
                services.studentService.sumAttendanceByRegion(regionQuery)
            ])
            const timeTable = services.studentService.createClassTimetable();
            res.render('app-studentDb/admin-region-attendance-summary.ejs', {
                dates: timeTable,
                data: childrenData,
                totalAttendance: aggregatedAttendance
            });
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    }
}