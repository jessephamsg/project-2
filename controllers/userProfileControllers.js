const services = require('../services');

module.exports = {
    async editUserProfile (req, res) {
        const note = req.body.note;
        const id = req.body.id;
        const account = await services.userAccountMgtService.editUserProfile(id, note);
        // res.render('admin.ejs', {
        //     account
        // })
        res.send(account);
    }
}