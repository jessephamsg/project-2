const services = require('../services');
const teacherValidator = require('../validators/teacherValidator');

module.exports = {
    async showDefaultData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showTotsData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showJuniorData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Junior');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showLowerPrimaryData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Lower Primary');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async showUpperPrimaryData(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Upper Primary');
        res.render('app-teacherDb/admin-teacher-ageGroups.ejs', {
            data: teacherData
        });
    },
    async addNewTeacherData(req, res) {
        const teacherDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            ageGroup: req.body.ageGroup,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            region: req.body.region,
            startDate: req.body.startDate,
            role: req.body.role
        }
        try {
            teacherValidator.teachers.validate(teacherDetails);
            const teacherData = await services.teacherService.createNewTeacher(teacherDetails)
            res.redirect('/teachers/age');
        } catch (err) {
            const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
            res.render('app-teacherDb/admin-newTeacher.ejs', {
                data: teacherData,
                err
            })
        }
    },
    async showDefaultRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Jurong East & West');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showJurongRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Jurong East & West');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showClementiRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Clementi');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showPanjangRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Bukit Panjang');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showBatokRegionData(req, res) {
        const teacherData = await services.teacherService.getTeachersByRegion('Chua Chu Kang & Bukit Batok');
        res.render('app-teacherDb/admin-teacher-region.ejs', {
            data: teacherData
        });
    },
    async showTotsTeacherRoster(req, res) {
        const teacherData = await services.teacherService.getTeachersByAgeGroup('Tots');
        const dailyManpower = 5;
        const slots = ['10-12PM', '2-4PM', '5-7PM'];
        const timeTable = services.studentService.createClassTimetable();
        res.render('app-teacherDb/admin-teacher-roster.ejs', {
            timeTable,
            data: teacherData,
            manpower: dailyManpower,
            timeslots: slots
        })
    },
    async updateTeacherRoster(req, res) {
        const roster = req.body.rosteredTeacher
        const filteredRoster = roster.filter(rosterDateAndID => rosterDateAndID.length > 10);
        const rosterArr = []
        for (const roster of filteredRoster) {
            const rosterObject = {
                date: roster.substr(2, 10), 
                id:roster.substring(13), 
                timing: roster.substr(0,1)
            }
            rosterArr.push(rosterObject);
        }
        const updatedTeacherData = await services.teacherService.setStaffRoster(rosterArr);
        res.send(updatedTeacherData);
    }
}