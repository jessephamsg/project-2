const bcrypt = require('bcrypt');
const services = require('../services');
const studentControllers = require('./studentControllers');
const teacherControllers = require('./teacherControllers');
const userSignupValidator = require('../validators/signupValidator');

module.exports = {
    showLandingPage(req, res) {
        res.render('onboarding/landing-page.ejs');
    },
    signUp(req, res) {
        res.render('onboarding/signup.ejs');
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
            userSignupValidator.userAccount.validate(userAccount);
            const account = await services.userAccountMgtService.createNewUser(userAccount)
            res.redirect('/login');
        } catch (err) {
            const account = await services.userAccountMgtService.createNewUser(userAccount)
            res.render('onboarding/signupError.ejs', {
                err
            })
        }
    },
    logIn(req, res) {
        res.render('onboarding/logIn.ejs')
    },
    async verifyAccount(req, res) {
        const foundUser = await services.userAccountMgtService.searchAccount(req.body.username);
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.account = foundUser;
            res.redirect('/dashboard');
        } else {
            res.render('onboarding/logInError.ejs', {
                err: 'Your account or password does not match any records. Please try again'
            });
        }
    },
    async showDashboard(req, res) {
        try {
            const [
                studentAttendance,
                teachersInCharge
            ] = await Promise.all([
                studentControllers.getMonthlyAvgAttendanceByAge(),
                teacherControllers.showTeachersByRole()
            ]);
            res.render('app-general/admin.ejs', {
                studentAttendance,
                teachersInCharge
            });
        } catch (err) {
            res.render('errors/404.ejs', {
                err
            })
        }
    },
    logOut(req, res) {
        return req.session.destroy(() => {
            res.redirect('/');
        });
    },
    controlAccess (req, res, next) {
        if(req.session.account) {
            next();
        } else {
            res.redirect('/')
        }
    }
}