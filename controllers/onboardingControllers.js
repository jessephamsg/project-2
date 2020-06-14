const services = require('../services');

module.exports = {
    showLandingPage (req, res) {
        res.render('landing-page.ejs');
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
        res.render('admin.ejs', {
            account
        })
    },
    async logIn (req, res) {
        res.render('logIn.ejs')
    },
    async verifyAccount (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username);
        console.log(password)
        const account = await services.userAccountMgtService.searchAccount(username, password);
        res.send(account);
    }
}