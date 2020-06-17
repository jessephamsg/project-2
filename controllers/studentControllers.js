const services = require('../services');

module.exports = {
    async showDefaultData (req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        res.render('admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showTotsData (req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Tots');
        res.render('admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showJuniorData (req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Junior');
        res.render('admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showLowerPrimaryData (req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Lower Primary');
        res.render('admin-ageGroups.ejs', {
            data: childrenData
        });
    },
    async showUpperPrimaryData (req, res) {
        const childrenData = await services.studentService.getStudentsByAgeGroup('Upper Primary');
        res.render('admin-ageGroups.ejs', {
            data: childrenData
        });
    }
}