// src/validators/customer.validator.js
const Joi = require("joi")

const createCustomerSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  email: Joi.string().email().max(160).required(),
  phone: Joi.string().max(20).allow("", null),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid("male", "female", "other").allow(null),
  dob: Joi.date().iso().allow(null),
})

const updateCustomerSchema = Joi.object({
  first_name: Joi.string().max(100),
  last_name: Joi.string().max(100),
  phone: Joi.string().max(20).allow("", null),
  password: Joi.string().min(6),
  gender: Joi.string().valid("male", "female", "other").allow(null),
  dob: Joi.date().iso().allow(null),
})

module.exports = { createCustomerSchema, updateCustomerSchema }
