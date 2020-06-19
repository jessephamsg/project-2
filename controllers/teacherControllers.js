const services = require('../services');

module.exports = {
    async showDefaultData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showTotsData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showJuniorData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Junior');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showLowerPrimaryData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Lower Primary');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showUpperPrimaryData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Upper Primary');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async addNewTeacherData (req, res) {
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
            res.render('admin-newChild.ejs', {
                data: childrenData,
                err
            })    
        }
    }
}