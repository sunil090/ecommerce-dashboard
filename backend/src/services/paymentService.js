const {payment} = require('../models');
const crypto = require('crypto');

const verifyPayment = async (paymentData) => {
  const { orderId, paymentId, signature, amount } = paymentData;
  
  // For Razorpay verification
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + '|' + paymentId)
    .digest('hex');
  
  if (expectedSignature !== signature) {
    throw new Error('Payment verification failed');
  }
  
  // Update order status to confirmed
  const orderService = require('./orderService');
  const updatedOrder = await orderService.updateOrderStatus(orderId, 'confirmed');
  
  return {
    verified: true,
    order: updatedOrder,
    paymentId,
    amount
  };
};

module.exports = {
  verifyPayment
};