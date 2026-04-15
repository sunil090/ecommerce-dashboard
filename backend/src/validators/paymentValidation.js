const Joi = require('joi');

const verifyPaymentSchema = Joi.object({
  orderId: Joi.string().required(),
  paymentId: Joi.string().required(),
  signature: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  currency: Joi.string().valid('INR', 'USD').default('INR')
});

module.exports = {
  verifyPaymentSchema
};