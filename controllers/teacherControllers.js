const services = require('../services');
const teacherValidator = require('../validators/teacherValidator');
const teacherHelper = require('./helpers/teacherHelper')

module.exports = {
    async showDefaultData(req, res) {
        await teacherHelper.showTeacherByAgeGroup(req, res, 'Tots');
    },
    async showTotsData(req, res) {
        await teacherHelper.showTeacherByAgeGroup(req, res, 'Tots');
    },
    async showJuniorData(req, res) {
        await teacherHelper.showTeacherByAgeGroup(req, res, 'Junior');
    },
    async showLowerPrimaryData(req, res) {
        await teacherHelper.showTeacherByAgeGroup(req, res, 'Lower Primary');
    },
    async showUpperPrimaryData(req, res) {
        await teacherHelper.showTeacherByAgeGroup(req, res, 'Upper Primary');
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
        await teacherHelper.showTeacherByRegion(req, res, 'Jurong East & West')
    },
    async showJurongRegionData(req, res) {
        await teacherHelper.showTeacherByRegion(req, res, 'Jurong East & West')
    },
    async showClementiRegionData(req, res) {
        await teacherHelper.showTeacherByRegion(req, res, 'Clementi')
    },
    async showPanjangRegionData(req, res) {
        await teacherHelper.showTeacherByRegion(req, res, 'Bukit Panjang')
    },
    async showBatokRegionData(req, res) {
        await teacherHelper.showTeacherByRegion(req, res, 'Chua Chu Kang & Bukit Batok')
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
    async showTeachersByRole (req, res) {
        const ageGroupLead = await services.teacherService.getTeachersByRole('Age Group Lead');
        const regionalLead = await services.teacherService.getTeachersByRole('Regional Lead');
        const teacherInCharge = {
            ageGroup: ageGroupLead,
            region: regionalLead
        }
        return teacherInCharge
    },
    async showTeacherDetailsByID (req, res) {
        const teacherID = req.params.index;
        const teacher = await services.teacherService.getTeacherByID(teacherID);
        res.render('app-teacherDb/admin-teacher-details.ejs', {
            data: teacher
        })
        //res.send(req.params.index)
    },
    async updateTeacherDetailsByID (req, res) {
        const teacherID = req.body.id;
        const updatedDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            ageGroup: req.body.ageGroup,
            role: req.body.role,
            contactNumber: req.body.contactNumber,
            startDate: req.body.startDate,
            address: req.body.address,
            region: req.body.region,
            rosteredSlot: req.body.rosteredSlot
        }
        const updatedTeacher = await services.teacherService.updateTeacherByID(teacherID,updatedDetails);
        res.redirect(`./${teacherID}`);
    }
}