const services = require('../services');
const teacherValidator = require('../validators/teacherValidator');

module.exports = {
    async showDefaultData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showTotsData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showJuniorData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Junior');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showLowerPrimaryData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Lower Primary');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showUpperPrimaryData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Upper Primary');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async addNewTeacherData(req, res) {
        const teacherDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            ageGroup: req.body.ageGroup,
            contactNumber: req.body.contactNumber,
        }
        try {
            teacherValidator.teachers.validate(teacherDetails);
            const teacherData = await services.teacherService.createNewTeacher(teacherDetails)
            res.redirect('/teachers/age');
        } catch (err) {
            const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
            res.render('app-teacherDb/admin-newTeacher.ejs', {
                data: teacherData,
                err
            })    
        }
    }
}