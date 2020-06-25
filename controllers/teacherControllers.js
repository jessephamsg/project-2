const services = require('../services');
const teacherValidator = require('../validators/teacherValidator');
const teacherHelper = require('./helpers/teacherHelper')

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
            address: req.body.address,
            region: req.body.region,
            startDate: req.body.startDate,
            role: req.body.role
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
    },
    async showDefaultRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Jurong East & West');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showJurongRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Jurong East & West');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showClementiRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Clementi');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showPanjangRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Bukit Panjang');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showBatokRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Chua Chu Kang & Bukit Batok');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showTotsTeacherRoster(req, res) {
        await teacherHelper.getTeacherDataByAgeGroup(req, res, 'Tots');
    },
    async showJuniorTeacherRoster(req, res) {
        await teacherHelper.getTeacherDataByAgeGroup(req, res, 'Junior');
    },
    async showLowerPrimaryTeacherRoster(req, res) {
        await teacherHelper.getTeacherDataByAgeGroup(req, res, 'Lower Primary');
    },
    async showUpperPrimaryTeacherRoster(req, res) {
        await teacherHelper.getTeacherDataByAgeGroup(req, res, 'Upper Primary');
    },
    async updateTeacherTotsRoster(req, res) {
        await teacherHelper.updateTeacherRoster(req, res);
        res.redirect('/teachers/age/Tots/roster')
    },
    async updateTeacherJuniorRoster(req, res) {
        await teacherHelper.updateTeacherRoster(req, res);
        res.redirect('/teachers/age/Junior/roster')
    },
    async updateTeacherLowerPrimaryRoster(req, res) {
        await teacherHelper.updateTeacherRoster(req, res);
        res.redirect('/teachers/age/lower-primary/roster')
    },
    async updateTeacherUpperPrimaryRoster(req, res) {
        await teacherHelper.updateTeacherRoster(req, res);
        res.redirect('/teachers/age/upper-primary/roster')
    },
}