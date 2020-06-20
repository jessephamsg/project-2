const services = require('../services');
const studentValidator = require('../validators/studentValidator');

module.exports = {
    async showDefaultData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showTotsData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showJuniorData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showLowerPrimaryData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showUpperPrimaryData(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        res.render('app-studentDb/admin-ageGroups.ejs', {
            data: childrenData
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
            dates: timeTable
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
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showJuniorAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showLowerPrimaryAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showUpperPrimaryAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable
        })
    },
    async showDefaultRegionData(req, res) {
        const childrenData = await services.studentService.getStudentsByRegion('Jurong East & West');
        res.render('app-studentDb/admin-regions.ejs', {
            data: childrenData
        });
    }
}