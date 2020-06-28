const services = require('../services');
const studentControllers = require('./studentControllers');
const teacherControllers = require('./teacherControllers');
const userLoginValidator = require('../validators/loginValidator');

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
        try {
            //userLoginValidator.userLogin.validate()
            const account = await services.userAccountMgtService.createNewUser(userAccount)
            res.redirect('/login');
        } catch (err) {
            const account = await services.userAccountMgtService.createNewUser(userAccount)
            res.render('onboarding/logInError.ejs', {
                err
            })
        }
    },
    logIn(req, res) {
        res.render('onboarding/logIn.ejs')
    },
    async verifyAccount(req, res) {
        //userLoginValidator.userLogin.validate()
        const username = req.body.username;
        const password = req.body.password;
        const account = await services.userAccountMgtService.searchAccount(username, password);
        req.session.account = account;
        res.redirect('/dashboard');
    },
    async showDashboard(req, res) {
        try {
            const studentAttendance = await studentControllers.getMonthlyAvgAttendanceByAge();
            const teachersInCharge = await teacherControllers.showTeachersByRole();
            res.render('app-general/admin.ejs', {
                //user: req.session.account
                studentAttendance,
                teachersInCharge
            });
        } catch (err) {
            console.log(err.message);
        }
        //res.send(studentAttendance)
    },
    logOut(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}