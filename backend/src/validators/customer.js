// src/validators/customer.js
const Joi = require('joi');

exports.createCustomer = Joi.object({
  loyaltyPoints: Joi.number().integer().min(0).optional(),
  totalOrders: Joi.number().integer().optional(),
  totalSpent: Joi.number().precision(2).optional(),
  preferences: Joi.object().optional(),
  newsletterSubscribed: Joi.boolean().optional(),
  dateOfBirth: Joi.date().optional(),
  gender: Joi.string().valid('male','female','other').optional(),
  userId: Joi.string().guid({ version: 'uuidv4' }).optional()
});
