const services = require('../services');

module.exports = {
    async showDefaultData (req, res) {
        const toddlerData = await services.studentService.getStudentsByAgeGroup('Tots');
        res.render('admin-ageGroups.ejs', {
            data: toddlerData
        });
    }
}