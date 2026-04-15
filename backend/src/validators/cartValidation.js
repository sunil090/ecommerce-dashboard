const Joi = require('joi');

const addToCartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  userId: Joi.string().required()
});

const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().min(0).required()
});

module.exports = {
  addToCartSchema,
  updateCartSchema
};