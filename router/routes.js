const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

router.get('/', controllers.onboardingControllers.showLandingPage);
router.get('/login', controllers.onboardingControllers.logIn);
router.post('/login', controllers.onboardingControllers.verifyAccount);
router.get('/logout', controllers.onboardingControllers.logOut)
router.post('/', controllers.onboardingControllers.createNewUser);
router.get('/dashboard', controllers.onboardingControllers.showDashboard);
router.put('/dashboard', controllers.userProfileControllers.editUserProfile);
module.exports = router;