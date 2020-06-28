const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

//Onboarding Routes
router.get('/', controllers.onboardingControllers.showLandingPage);
router.get('/login', controllers.onboardingControllers.logIn);
router.get('/signup', controllers.onboardingControllers.signUp);
router.delete('/logout', controllers.onboardingControllers.logOut)
router.post('/login', controllers.onboardingControllers.verifyAccount);
router.post('/', controllers.onboardingControllers.createNewUser);

router.use(controllers.onboardingControllers.controlAccess);

//Dashboard Routes
router.get('/dashboard', controllers.onboardingControllers.showDashboard);
router.put('/dashboard', controllers.userProfileControllers.editUserProfile);


//Super Admin App Routes - Students Age
router.get('/students/age', controllers.studentControllers.showDefaultData);
router.get('/students/age/tots', controllers.studentControllers.showTotsData);
router.get('/students/age/junior', controllers.studentControllers.showJuniorData);
router.get('/students/age/lower-primary', controllers.studentControllers.showLowerPrimaryData);
router.get('/students/age/upper-primary', controllers.studentControllers.showUpperPrimaryData);

router.put('/students/:index', controllers.studentControllers.updateStudentData);
router.delete('/students/:index', controllers.studentControllers.deleteStudentByID);
router.post('/students/age', controllers.studentControllers.addNewStudentData);

router.get('/students/age/tots/form', controllers.studentControllers.showTotsAttendanceForm);
router.get('/students/age/junior/form', controllers.studentControllers.showJuniorAttendanceForm);
router.get('/students/age/lower-primary/form', controllers.studentControllers.showLowerPrimaryAttendanceForm);
router.get('/students/age/upper-primary/form', controllers.studentControllers.showUpperPrimaryAttendanceForm);

router.post('/students/age/tots/form', controllers.studentControllers.updateTotsStudentAttendance);
router.post('/students/age/junior/form', controllers.studentControllers.updateJuniorStudentAttendance);
router.post('/students/age/lower-primary/form', controllers.studentControllers.updateLowerPrimaryStudentAttendance);
router.post('/students/age/upper-primary/form', controllers.studentControllers.updateUpperPrimaryStudentAttendance);

router.get('/students/age/tots/attendance', controllers.studentControllers.showTotsAttendance);
router.get('/students/age/junior/attendance', controllers.studentControllers.showJuniorAttendance);
router.get('/students/age/lower-primary/attendance', controllers.studentControllers.showLowerPrimaryAttendance);
router.get('/students/age/upper-primary/attendance', controllers.studentControllers.showUpperPrimaryAttendance);


//Super Admin App Routes - Students Region
router.get('/students/region', controllers.studentControllers.showDefaultRegionData);
router.get('/students/:index', controllers.studentControllers.showStudentPage);

router.get('/students/region/jurong', controllers.studentControllers.showJurongRegionData);
router.get('/students/region/clementi', controllers.studentControllers.showClementiRegionData);
router.get('/students/region/bukit-panjang', controllers.studentControllers.showPanjangRegionData);
router.get('/students/region/cck-bb', controllers.studentControllers.showBatokRegionData);

router.get('/students/region/jurong/attendance', controllers.studentControllers.showJurongRegionAttendanceData);
router.get('/students/region/clementi/attendance', controllers.studentControllers.showClementiRegionAttendanceData);
router.get('/students/region/bukit-panjang/attendance', controllers.studentControllers.showPanjangRegionAttendanceData);
router.get('/students/region/cck-bb/attendance', controllers.studentControllers.showBatokRegionAttendanceData);

//Super Admin App Routes - Teachers
router.get('/teachers/age', controllers.teacherControllers.showDefaultData);
router.get('/teachers/age/tots', controllers.teacherControllers.showTotsData);
router.get('/teachers/age/junior', controllers.teacherControllers.showJuniorData);
router.get('/teachers/age/lower-primary', controllers.teacherControllers.showLowerPrimaryData);
router.get('/teachers/age/upper-primary', controllers.teacherControllers.showUpperPrimaryData);

router.post('/teachers/age', controllers.teacherControllers.addNewTeacherData);

router.get('/teachers/region', controllers.teacherControllers.showDefaultRegionData);
router.get('/teachers/:index', controllers.teacherControllers.showTeacherDetailsByID);
router.put('/teachers/:index', controllers.teacherControllers.updateTeacherDetailsByID);
router.delete('/teachers/:index', controllers.teacherControllers.deleteTeacherByID);

router.get('/teachers/region/jurong', controllers.teacherControllers.showJurongRegionData);
router.get('/teachers/region/clementi', controllers.teacherControllers.showClementiRegionData);
router.get('/teachers/region/bukit-panjang', controllers.teacherControllers.showPanjangRegionData);
router.get('/teachers/region/cck-bb', controllers.teacherControllers.showBatokRegionData);

router.get('/teachers/age/tots/roster', controllers.teacherControllers.showTotsTeacherRoster);
router.get('/teachers/age/junior/roster', controllers.teacherControllers.showJuniorTeacherRoster);
router.get('/teachers/age/lower-primary/roster', controllers.teacherControllers.showLowerPrimaryTeacherRoster);
router.get('/teachers/age/upper-primary/roster', controllers.teacherControllers.showUpperPrimaryTeacherRoster);

router.post('/teachers/age/tots/roster', controllers.teacherControllers.updateTeacherTotsRoster);
router.post('/teachers/age/junior/roster', controllers.teacherControllers.updateTeacherJuniorRoster);
router.post('/teachers/age/lower-primary/roster', controllers.teacherControllers.updateTeacherLowerPrimaryRoster);
router.post('/teachers/age/upper-primary/roster', controllers.teacherControllers.updateTeacherUpperPrimaryRoster);



module.exports = router;