// src/validators/review.validator.js
const Joi = require("joi")

const addReviewSchema = Joi.object({
  productId: Joi.number().integer().required(),
  customerId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow("", null),
})

const getReviewsByProductSchema = Joi.object({
  productId: Joi.number().integer().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
})

module.exports = { addReviewSchema, getReviewsByProductSchema }
