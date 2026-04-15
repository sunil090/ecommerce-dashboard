const Joi = require('joi');


const createBrandValidator = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().allow('', null).max(500)
});


const updateBrandValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('', null).max(500),
  isActive: Joi.boolean()
});

const brandIdValidator = Joi.object({
   id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required()
});

module.exports = {
  createBrandValidator,
  updateBrandValidator,
  brandIdValidator
};