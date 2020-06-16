const services = require('../services');

module.exports = {
    showLandingPage (req, res) {
        res.render('landing-page.ejs');
    },
    signUp (req, res) {
        res.render('signUp.ejs');
    },
    async createNewUser (req, res) {
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
    logIn (req, res) {
        res.render('logIn.ejs')
    },
    async verifyAccount (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const account = await services.userAccountMgtService.searchAccount(username, password);
        req.session.account = account;
        res.redirect('/dashboard');
    },
    async showDashboard (req, res) {
        res.render('admin.ejs', {
            user: req.session.account
        });
    },
    logOut (req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}