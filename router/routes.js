const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

//Onboarding Routes
router.get('/', controllers.onboardingControllers.showLandingPage);
router.get('/login', controllers.onboardingControllers.logIn);
router.get('/signup', controllers.onboardingControllers.signUp);
router.get('/dashboard', controllers.onboardingControllers.showDashboard);
router.get('/logout', controllers.onboardingControllers.logOut)
router.post('/login', controllers.onboardingControllers.verifyAccount);
router.post('/', controllers.onboardingControllers.createNewUser);
router.put('/dashboard', controllers.userProfileControllers.editUserProfile);

//Super Admin App Routes - Students Age

router.get('/students/age', controllers.studentControllers.showDefaultData);
router.get('/students/age/tots', controllers.studentControllers.showTotsData);
router.get('/students/age/junior', controllers.studentControllers.showJuniorData);
router.get('/students/age/lower-primary', controllers.studentControllers.showLowerPrimaryData);
router.get('/students/age/upper-primary', controllers.studentControllers.showUpperPrimaryData);

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

//Super Admin App Routes - Teachers
router.get('/teachers/age', controllers.teacherControllers.showDefaultData);
router.get('/teachers/age/tots', controllers.teacherControllers.showTotsData);
router.get('/teachers/age/junior', controllers.teacherControllers.showJuniorData);
router.get('/teachers/age/lower-primary', controllers.teacherControllers.showLowerPrimaryData);
router.get('/teachers/age/upper-primary', controllers.teacherControllers.showUpperPrimaryData);
router.post('/teachers/age', controllers.teacherControllers.addNewTeacherData);



module.exports = router;