const services = require('../services');

module.exports = {
    async showDefaultData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('admin-ageGroups.ejs', {
            data: teacherData
        });
    }
}