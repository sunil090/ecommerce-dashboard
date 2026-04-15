const paymentService = require('../services/paymentService');

const verifyPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const result = await paymentService.verifyPayment(paymentData);
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  verifyPayment
};