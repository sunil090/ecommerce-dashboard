// src/validators/product.validators.js
const Joi = require('joi');

const createProductValidator = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().positive().required(),
  sku: Joi.string().required(),
  brandId: Joi.string().guid({ version: 'uuidv4' }).required(),
  quantity: Joi.number().integer().min(0).required(),
  status: Joi.string().valid('active', 'inactive').required(),
  categoryId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const updateProductValidator = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(5),
  price: Joi.number().positive(),
  sku: Joi.string(),
  brandId: Joi.string().guid({ version: 'uuidv4' }),
  quantity: Joi.number().integer().min(0),
  status: Joi.string().valid('active', 'inactive'),
  categoryId: Joi.string().guid({ version: 'uuidv4' })
}).min(1); // at least one field required for update

const productIdValidator = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required()
});

module.exports = {
  createProductValidator,
  updateProductValidator,
  productIdValidator
};
