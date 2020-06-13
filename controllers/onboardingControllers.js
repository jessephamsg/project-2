const services = require('../services');

module.exports = {
    showLandingPage (req, res) {
        res.render('landing-page.ejs');
    },
    async createNewUser (req, res) {
        const name = req.body.name;
        const account = await services.userAccountMgtService.createNewUser(name)
        res.send(`hey there, ${account}`);
    }
}