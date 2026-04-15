// src/repositories/token.repository.js
const { Token } = require('../models');

const isBlacklisted = async (token) => {
  try {
    const record = await Token.findOne({ where: { token } });
    console.log('Token found:', record);  // Add this to check if the token exists
    return !!record; // true if found (blacklisted)
  } catch (err) {
    console.error('Error checking if token is blacklisted:', err);
    throw err;  // Rethrow error for further handling
  }
};

module.exports = { isBlacklisted };
