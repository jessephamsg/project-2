const services = require('../services');
const studentControllers = require('./studentControllers');
const teacherControllers = require('./teacherControllers');

module.exports = {
    showLandingPage(req, res) {
        res.render('onboarding/landing-page.ejs');
    },
    signUp(req, res) {
        res.render('onboarding/signUp.ejs');
    },
    async createNewUser(req, res) {
        const userAccount = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            school: req.body.school,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
        }
        const account = await services.userAccountMgtService.createNewUser(userAccount)
        res.redirect('/login');
    },
    logIn(req, res) {
        res.render('onboarding/logIn.ejs')
    },
    async verifyAccount(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const account = await services.userAccountMgtService.searchAccount(username, password);
        req.session.account = account;
        res.redirect('/dashboard');
    },
    async showDashboard(req, res) {
        const studentAttendance = await studentControllers.getMonthlyAvgAttendanceByAge();
        const teachersInCharge = await teacherControllers.showTeachersByRole();
        res.render('app-general/admin.ejs', {
            //user: req.session.account
            studentAttendance,
            teachersInCharge
        });
        //res.send(studentAttendance)
    },
    logOut(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}