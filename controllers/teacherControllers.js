const services = require('../services');

module.exports = {
    async showDefaultData (req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    }
}