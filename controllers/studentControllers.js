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
            firstSeen: req.body.firstSeen,
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
    async updateStudentAttendance(req, res) {
        const studentsPresent = req.body.isPresent;
        const datePresent = req.body.classDate;
        studentsPresent.forEach(async student => {
            await services.studentService.updateStudentAttendanceById(student, datePresent);
        })
        res.redirect('/students/age/Tots/attendance');
    },
    async showTotsAttendance(req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-studentDb/admin-attendance-summary.ejs', {
            data: childrenData,
            dates: timeTable
        })
    }
}