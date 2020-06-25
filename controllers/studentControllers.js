const services = require('../services');
const studentValidator = require('../validators/studentValidator');
const controllerHelpers = require('./helpers/helper');
const analysisHelpers = require('./helpers/analysis')


module.exports = {
    async showDefaultData(req, res) {
        await controllerHelpers.renderStudentPageByAge(req, res, 'Tots');
    },
    async showTotsData(req, res) {
        await controllerHelpers.renderStudentPageByAge(req, res, 'Tots');
    },
    async showJuniorData(req, res) {
        await controllerHelpers.renderStudentPageByAge(req, res, 'Junior');
    },
    async showLowerPrimaryData(req, res) {
        await controllerHelpers.renderStudentPageByAge(req, res, 'Lower Primary');
    },
    async showUpperPrimaryData(req, res) {
        await controllerHelpers.renderStudentPageByAge(req, res, 'Upper Primary');
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
        await controllerHelpers.renderAttendanceForm(req, res, 'Tots')
    },
    async showJuniorAttendanceForm(req, res) {
        await controllerHelpers.renderAttendanceForm(req, res, 'Junior')
    },
    async showLowerPrimaryAttendanceForm(req, res) {
        await controllerHelpers.renderAttendanceForm(req, res, 'Lower Primary')
    },
    async showUpperPrimaryAttendanceForm(req, res) {
        await controllerHelpers.renderAttendanceForm(req, res, 'Upper Primary')
    },
    async updateTotsStudentAttendance(req, res) {
        await controllerHelpers.updateAttendanceStats(req, res)
        res.redirect('/students/age/Tots/attendance');
    },
    async updateJuniorStudentAttendance(req, res) {
        await controllerHelpers.updateAttendanceStats(req, res)
        res.redirect('/students/age/junior/attendance');
    },
    async updateLowerPrimaryStudentAttendance(req, res) {
        await controllerHelpers.updateAttendanceStats(req, res)
        res.redirect('/students/age/lower-primary/attendance');
    },
    async updateUpperPrimaryStudentAttendance(req, res) {
        await controllerHelpers.updateAttendanceStats(req, res)
        res.redirect('/students/age/upper-primary/attendance');
    },
    async showTotsAttendance(req, res) {
        await controllerHelpers.renderAttendanceSummary(req, res, 'Tots');
    },
    async showJuniorAttendance(req, res) {
        await controllerHelpers.renderAttendanceSummary(req, res, 'Junior');
    },
    async showLowerPrimaryAttendance(req, res) {
        await controllerHelpers.renderAttendanceSummary(req, res, 'Lower Primary');
    },
    async showUpperPrimaryAttendance(req, res) {
        await controllerHelpers.renderAttendanceSummary(req, res, 'Upper Primary');
    },
    async showDefaultRegionData(req, res) {
        await controllerHelpers.renderStudentPageByRegion(req, res, 'Jurong East & West');
    },
    async showJurongRegionData(req, res) {
        await controllerHelpers.renderStudentPageByRegion(req, res, 'Jurong East & West');
    },
    async showClementiRegionData(req, res) {
        await controllerHelpers.renderStudentPageByRegion(req, res, 'Clementi');
    },
    async showPanjangRegionData(req, res) {
        await controllerHelpers.renderStudentPageByRegion(req, res, 'Bukit Panjang');
    },
    async showBatokRegionData(req, res) {
        await controllerHelpers.renderStudentPageByRegion(req, res, 'Chua Chu Kang & Bukit Batok');
    },
    async showJurongRegionAttendanceData(req, res) {
        await controllerHelpers.renderRegionalAttendanceStats(req, res, 'Jurong East & West');
    },
    async showClementiRegionAttendanceData(req, res) {
        await controllerHelpers.renderRegionalAttendanceStats(req, res, 'Clementi');
    },
    async showPanjangRegionAttendanceData(req, res) {
        await controllerHelpers.renderRegionalAttendanceStats(req, res, 'Bukit Panjang');
    },
    async showBatokRegionAttendanceData(req, res) {
        await controllerHelpers.renderRegionalAttendanceStats(req, res, 'Chua Chu Kang & Bukit Batok');
    },
    async getMonthlyAvgAttendanceByAge (req, res) {
        const totsAttendance = await services.studentService.sumAttendance('Tots');
        const juniorAttendance = await services.studentService.sumAttendance('Junior');
        const upperPrimaryAttendance = await services.studentService.sumAttendance('Upper Primary');
        const lowerPrimaryAttendance = await services.studentService.sumAttendance('Lower Primary');
        const totsMonthlyAvgAttendance = await analysisHelpers.getMonthlyAttendanceByAge(totsAttendance);
        const juniorMonthlyAvgAttendance = await analysisHelpers.getMonthlyAttendanceByAge(juniorAttendance);
        const lowerPrimaryMonthlyAvgAttendance = await analysisHelpers.getMonthlyAttendanceByAge(lowerPrimaryAttendance);
        const upperPrimaryMonthlyAvgAttendance = await analysisHelpers.getMonthlyAttendanceByAge(upperPrimaryAttendance);
        const attendance = {
            totsMonthlyAvgAttendance,
            juniorMonthlyAvgAttendance,
            lowerPrimaryMonthlyAvgAttendance,
            upperPrimaryMonthlyAvgAttendance
        }
        return attendance
    }
}