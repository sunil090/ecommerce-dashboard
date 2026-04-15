const Joi = require('joi');

const trackProductSchema = Joi.object({
  sessionId: Joi.string().optional(),
  ipAddress: Joi.string().ip().optional(),
  userAgent: Joi.string().optional(),
  referrer: Joi.string().uri().optional(),
  utmSource: Joi.string().optional(),
  utmMedium: Joi.string().optional(),
  utmCampaign: Joi.string().optional(),
  utmTerm: Joi.string().optional(),
  utmContent: Joi.string().optional(),
  pageUrl: Joi.string().uri().optional(),
  duration: Joi.number().integer().min(0).optional(),
  scrollDepth: Joi.number().integer().min(0).max(100).optional(),
  metadata: Joi.object().optional(),
});

const validateTrackProduct = (data) => trackProductSchema.validate(data);

module.exports = {
  validateTrackProduct,
};