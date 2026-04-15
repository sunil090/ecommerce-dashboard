// src/validations/address.validation.js
const Joi = require("joi");

const allowedTypes = ["shipping", "billing", "office", "home", "other"];

const createAddressSchema = Joi.object({
  customerId: Joi.string().uuid().required().label("customerId"),
  firstName: Joi.string().max(150).required().label("firstName"),
  lastName: Joi.string().max(150).optional().label("lastName"),
  phone: Joi.string().max(20).required().label("phone"),
  addressLine1: Joi.string().max(255).required().label("addressLine1"),
  addressLine2: Joi.string().max(255).optional().label("addressLine2"),
  city: Joi.string().max(100).required().label("city"),
  state: Joi.string().max(100).required().label("state"),
  country: Joi.string().max(100).required().label("country"),
  postalCode: Joi.string().max(32).required().label("postalCode"),
  label: Joi.string().max(100).optional().label("label"),
  type: Joi.string().valid(...allowedTypes).optional().label("type"),
  isDefault: Joi.boolean().optional().label("isDefault"),
});

const updateAddressSchema = Joi.object({
  customerId: Joi.string().uuid().optional().label("customerId"),
  firstName: Joi.string().max(150).optional().label("firstName"),
  lastName: Joi.string().max(150).optional().label("lastName"),
  phone: Joi.string().max(20).optional().label("phone"),
  addressLine1: Joi.string().max(255).optional().label("addressLine1"),
  addressLine2: Joi.string().max(255).optional().label("addressLine2"),
  city: Joi.string().max(100).optional().label("city"),
  state: Joi.string().max(100).optional().label("state"),
  country: Joi.string().max(100).optional().label("country"),
  postalCode: Joi.string().max(32).optional().label("postalCode"),
  label: Joi.string().max(100).optional().label("label"),
  type: Joi.string().valid(...allowedTypes).optional().label("type"),
  isDefault: Joi.boolean().optional().label("isDefault"),
});

module.exports = { createAddressSchema, updateAddressSchema };
