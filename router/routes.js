const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

router.get('/', controllers.onboardingControllers.showLandingPage);
router.get('/login', controllers.onboardingControllers.logIn);
router.post('/login', controllers.onboardingControllers.verifyAccount);
router.post('/', controllers.onboardingControllers.createNewUser);
router.put('/dashboard', controllers.userProfileControllers.editUserProfile);
module.exports = router;