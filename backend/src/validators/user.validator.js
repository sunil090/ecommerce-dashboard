const { body, validationResult } = require('express-validator');

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

const signupRules = [
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').optional().isString(),
  runValidation,
];

const loginRules = [
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  runValidation,
];

module.exports = { signupRules, loginRules };
