const Joi = require('joi');

const createCategoryValidator = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().allow('', null).max(500)
});

const updateCategoryValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('', null).max(500),
  isActive: Joi.boolean()
});

const categoryIdValidator = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4','uuidv5'] }).required()
});

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator
};