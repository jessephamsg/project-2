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

//Super Admin App Routes


module.exports = router;