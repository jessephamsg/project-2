const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

router.get('/', controllers.onboardingControllers.showLandingPage);
router.post('/', controllers.onboardingControllers.createNewUser);

module.exports = router;