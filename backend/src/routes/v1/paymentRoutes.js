const express = require('express');
const router = express.Router();

const paymentController = require('../../controllers/paymentController');
const validate = require('../../middlewares/validate');
const { isAuthenticated } = require('../../middlewares/auth.middleware'); // ✅ destructured

router.post('/verify', isAuthenticated, paymentController.verifyPayment);

module.exports = router;
