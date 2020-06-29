const services = require('../../services');

module.exports = {
    async renderStudentPageByAge(req, res, ageQuery) {
        const childrenData = await services.studentService.getStudentsByAgeGroup(ageQuery);
        const regulars = await services.studentService.sumRegularsByAge(ageQuery, true);
        const irregulars = await services.studentService.sumRegularsByAge(ageQuery, false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async renderAttendanceForm(req, res, ageQuery) {
        const childrenData = await services.studentService.getStudentsByAgeGroup(ageQuery);
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance.ejs', {
            data: childrenData,
            dates: timeTable,
        })
    },
    async updateAttendanceStats(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
    },
    async renderAttendanceSummary(req, res, ageQuery) {
        const [
            childrenData,
            aggregatedAttendance
        ] = await Promise.all([
            services.studentService.getStudentsByAgeGroup(ageQuery),
            services.studentService.sumAttendance(ageQuery)
        ])
        //const childrenData = await services.studentService.getStudentsByAgeGroup(ageQuery);
        const timeTable = services.studentService.createClassTimetable();
        //const aggregatedAttendance = await services.studentService.sumAttendance(ageQuery);
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable,
            totalAttendance: aggregatedAttendance
        })
    },
    async renderStudentPageByRegion(req, res, regionQuery) {
        const [
            childrenData,
            regulars,
            irregulars
        ] = await Promise.all([
            services.studentService.getStudentsByRegion(regionQuery),
            services.studentService.sumRegularsByRegion(regionQuery, true),
            services.studentService.sumRegularsByRegion(regionQuery, false)
        ])
        // const childrenData = await services.studentService.getStudentsByRegion(regionQuery);
        // const regulars = await services.studentService.sumRegularsByRegion(regionQuery, true);
        // const irregulars = await services.studentService.sumRegularsByRegion(regionQuery, false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async renderRegionalAttendanceStats(req, res, regionQuery) {
        const [
            childrenData,
            aggregatedAttendance
        ] = await Promise.all([
            services.studentService.getStudentsByRegion(regionQuery),
            services.studentService.sumAttendanceByRegion(regionQuery)
        ])
        //const childrenData = await services.studentService.getStudentsByRegion(regionQuery);
        const timeTable = services.studentService.createClassTimetable();
        //const aggregatedAttendance = await services.studentService.sumAttendanceByRegion(regionQuery);
        res.render('app-studentDb/admin-region-attendance-summary.ejs', {
            dates: timeTable,
            data: childrenData,
            totalAttendance: aggregatedAttendance
        });
    }
}