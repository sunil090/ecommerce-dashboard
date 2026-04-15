// src/controllers/user.controller.js
const asyncHandler = require('../../middlewares/async.middleware');
const userService = require('../../services/user.service');
const ApiError = require('../../utils/apiError');

// Signup handler
const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const { user, token } = await userService.createUser({ email, password, name });
  res.status(201).json({ success: true, data: user, token });
});

// Login handler
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await userService.authenticateUser(email, password);
  res.json({ success: true, data: user, token });
});

// Logout handler (simplified)
const logout = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new ApiError(400, 'Authorization token required');
  const token = match[1];
  await userService.logoutToken(token); // Simple token invalidation
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user handler
const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = { signup, login, logout, me };
