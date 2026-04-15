// src/middlewares/validate.js
const Joi = require('joi');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    // defensive checks
    if (!schema) {
      console.error('[validate middleware] schema is undefined or null. Make sure you exported/imported it correctly.');
      return res.status(500).json({
        success: false,
        message: 'Server validation error: schema not provided'
      });
    }

    if (typeof schema.validate !== 'function') {
      console.error('[validate middleware] provided schema does not have a validate function:', schema);
      return res.status(500).json({
        success: false,
        message: 'Server validation error: invalid schema'
      });
    }

    const toValidate = req[property] || {};
    const { error, value } = schema.validate(toValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(d => d.message).join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    }

    req[property] = value;
    return next();
  };
};

module.exports = validate;
