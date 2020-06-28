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
            const ageGroup = req.body.ageGroup.split(' ').join('-');
            studentValidator.students.validate(studentDetails);
            const childrenData = await services.studentService.createNewStudent(studentDetails);
            res.redirect(`/students/age/${ageGroup}`);
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
        const [
            totsAttendance, 
            juniorAttendance, 
            upperPrimaryAttendance, 
            lowerPrimaryAttendance, 
            totalTotsChildren,
            totalJuniorChildren,
            totalLowerPrimaryChildren,
            totalUpperPrimaryChildren
        ] = await Promise.all([
            services.studentService.sumAttendance('Tots'),
            services.studentService.sumAttendance('Junior'),
            services.studentService.sumAttendance('Upper Primary'),
            services.studentService.sumAttendance('Lower Primary'),
            analysisHelpers.getTotalChildrenByAgeGroup('Tots'),
            analysisHelpers.getTotalChildrenByAgeGroup('Junior'),
            analysisHelpers.getTotalChildrenByAgeGroup('Lower Primary'),
            analysisHelpers.getTotalChildrenByAgeGroup('Upper Primary')
        ]);
        const totsMonthlyAvgAttendance =  analysisHelpers.getMonthlyAttendanceByAge(totsAttendance);
        const juniorMonthlyAvgAttendance =  analysisHelpers.getMonthlyAttendanceByAge(juniorAttendance);
        const lowerPrimaryMonthlyAvgAttendance =  analysisHelpers.getMonthlyAttendanceByAge(lowerPrimaryAttendance);
        const upperPrimaryMonthlyAvgAttendance =  analysisHelpers.getMonthlyAttendanceByAge(upperPrimaryAttendance);
        const totalMonthlyAvgAttendance =  analysisHelpers.getMonthlyAttendance([totsMonthlyAvgAttendance, juniorMonthlyAvgAttendance, lowerPrimaryMonthlyAvgAttendance, upperPrimaryMonthlyAvgAttendance]);
        
        const attendance = {
            totalMonthlyAvgAttendance,
            totalTotsChildren,
            totalJuniorChildren,
            totalLowerPrimaryChildren,
            totalUpperPrimaryChildren,
            totsMonthlyAvgAttendance,
            juniorMonthlyAvgAttendance,
            lowerPrimaryMonthlyAvgAttendance,
            upperPrimaryMonthlyAvgAttendance
        }
        return attendance
    },
    async showStudentPage (req, res) {
        const studentID = req.params.index;
        const student = await services.studentService.getStudentByID(studentID);
        res.render('app-studentDb/admin-student-details.ejs', {
            data: student
        })
    },
    async updateStudentData (req, res) {
        const studentID = req.body.id;
        const updatedObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            ageGroup: req.body.ageGroup,
            guardianName: req.body.guardianName,
            guardianContact: req.body.guardianContact,
            guardianRole: req.body.guardianRole,
            membership: req.body.membership,
            address: req.body.address,
            region: req.body.region,
            isPresent: req.body.isPresent
        }
        const ageGroup = updatedObject.ageGroup.split(' ').join('-');
        const updatedStudent = await services.studentService.setStudentProfileByID(studentID,updatedObject);
        res.redirect(`/students/age/${ageGroup}`);
    },
    async deleteStudentByID (req, res) {
        const studentID = req.params.index;
        const ageGroup = req.body.ageGroup.split(' ').join('-');
        const deletedStudent = await services.studentService.deleteStudentByID(studentID);
        res.redirect(`/students/age/${ageGroup}`);
    }
}