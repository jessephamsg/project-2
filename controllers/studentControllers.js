const services = require('../services');
const studentValidator = require('../validators/studentValidator');

module.exports = {
    async showDefaultData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        const regulars = await services.studentService.sumRegularsByAge('Tots', true);
        const irregulars = await services.studentService.sumRegularsByAge('Tots', false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showTotsData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        const regulars = await services.studentService.sumRegularsByAge('Tots', true);
        const irregulars = await services.studentService.sumRegularsByAge('Tots', false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showJuniorData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        const regulars = await services.studentService.sumRegularsByAge('Junior', true);
        const irregulars = await services.studentService.sumRegularsByAge('Junior', false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showLowerPrimaryData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        const regulars = await services.studentService.sumRegularsByAge('Lower Primary', true);
        const irregulars = await services.studentService.sumRegularsByAge('Lower Primary', false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showUpperPrimaryData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        const regulars = await services.studentService.sumRegularsByAge('Upper Primary', true);
        const irregulars = await services.studentService.sumRegularsByAge('Upper Primary', false);
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async addNewStudentData(req, res) {
        const studentDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            ageGroup: req.body.ageGroup,
            guardianName: req.body.guardianName,
            guardianContact: req.body.guardianContact,
            guardianRole: req.body.guardianRole,
            membership: req.body.membership,
            address: req.body.address,
            region: req.body.region
        }
        try {
            studentValidator.students.validate(studentDetails);
            const childrenData = await services.studentService.createNewStudent(studentDetails);
            res.redirect('/students/age');
        } catch (err) {
            const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
            res.render('app-studentDb/admin-newChild.ejs', {
                data: childrenData,
                err
            })
        }
    },
    async showTotsAttendanceForm(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance.ejs', {
            data: childrenData,
            dates: timeTable,
        })
    },
    async showJuniorAttendanceForm(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showLowerPrimaryAttendanceForm(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showUpperPrimaryAttendanceForm(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async updateTotsStudentAttendance(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
        res.redirect('/students/age/Tots/attendance');
    },
    async updateJuniorStudentAttendance(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
        res.redirect('/students/age/junior/attendance');
    },
    async updateLowerPrimaryStudentAttendance(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
        res.redirect('/students/age/lower-primary/attendance');
    },
    async updateUpperPrimaryStudentAttendance(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
        res.redirect('/students/age/upper-primary/attendance');
    },
    async showTotsAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendance('Tots');
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable,
            totalAttendance: aggregatedAttendance
        })
    },
    async showJuniorAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendance('Junior');
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable,
            totalAttendance: aggregatedAttendance
        })
    },
    async showLowerPrimaryAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendance('Lower Primary');
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable,
            totalAttendance: aggregatedAttendance
        })
    },
    async showUpperPrimaryAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendance('Upper Primary');
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable,
            totalAttendance: aggregatedAttendance
        })
    },
    async showDefaultRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Jurong East & West');
        const regulars = await services.studentService.sumRegularsByRegion('Jurong East & West', true);
        const irregulars = await services.studentService.sumRegularsByRegion('Jurong East & West', false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showJurongRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Jurong East & West');
        const regulars = await services.studentService.sumRegularsByRegion('Jurong East & West', true);
        const irregulars = await services.studentService.sumRegularsByRegion('Jurong East & West', false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showClementiRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Clementi');
        const regulars = await services.studentService.sumRegularsByRegion('Clementi', true);
        const irregulars = await services.studentService.sumRegularsByRegion('Clementi', false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showPanjangRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Bukit Panjang');
        const regulars = await services.studentService.sumRegularsByRegion('Bukit Panjang', true);
        const irregulars = await services.studentService.sumRegularsByRegion('Bukit Panjang', false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showBatokRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Chua Chu Kang & Bukit Batok');
        const regulars = await services.studentService.sumRegularsByRegion('Chua Chu Kang & Bukit Batok', true);
        const irregulars = await services.studentService.sumRegularsByRegion('Chua Chu Kang & Bukit Batok', false);
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData,
            regulars,
            irregulars
        });
    },
    async showJurongRegionAttendanceData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Jurong East & West');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendanceByRegion('Jurong East & West');
        res.render('app-studentDb/admin-region-attendance-summary.ejs', {
            dates: timeTable,
            data: childrenData,
            totalAttendance: aggregatedAttendance
        });
    },
    async showClementiRegionAttendanceData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Clementi');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendanceByRegion('Clementi');
        res.render('app-studentDb/admin-region-attendance-summary.ejs', {
            dates: timeTable,
            data: childrenData,
            totalAttendance: aggregatedAttendance
        });
    },
    async showPanjangRegionAttendanceData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Bukit Panjang');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendanceByRegion('Bukit Panjang');
        res.render('app-studentDb/admin-region-attendance-summary.ejs', {
            dates: timeTable,
            data: childrenData,
            totalAttendance: aggregatedAttendance
        });
    },
    async showBatokRegionAttendanceData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Chua Chu Kang & Bukit Batok');
        const timeTable = services.studentService.createClassTimetable();
        const aggregatedAttendance = await services.studentService.sumAttendanceByRegion('Chua Chu Kang & Bukit Batok');
        res.render('app-studentDb/admin-region-attendance-summary.ejs', {
            dates: timeTable,
            data: childrenData,
            totalAttendance: aggregatedAttendance
        });
    },
}