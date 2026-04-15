const express = require('express');
const router = express.Router();

const userController = require('../../controllers/v1/user.controller');
const { signupRules, loginRules } = require('../../validators/user.validator');
const { isAuthenticated } = require('../../middlewares/auth.middleware');
const { authorizeRoles } = require('../../middlewares/role.middleware');

// Auth routes
router.post('/signup', signupRules, userController.signup);
router.post('/login', loginRules, userController.login);
router.post('/logout', isAuthenticated, userController.logout);
router.get('/me', isAuthenticated, userController.me);

module.exports = router;
