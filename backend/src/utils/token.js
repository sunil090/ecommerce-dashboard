// src/utils/token.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'replace_me';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '8h';

/**
 * Sign a token. expiresIn can be a string like '1h' or a number in seconds.
 * If not provided, JWT_EXPIRY from .env is used.
 */
function signToken(payload, expiresIn = JWT_EXPIRY) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  console.log(`Signed token with payload ${JSON.stringify(payload)} and expires in ${jwt.decode(token).exp}`);
  return token;
}

/** Verify token and return payload (throws on invalid/expired) */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/** Decode token payload without verifying (useful to read exp) */
function decodeToken(token) {
  const decoded = jwt.decode(token);
  console.log(`Decoded token with payload ${JSON.stringify(decoded)} and expires in ${decoded.exp}`);
  return decoded;
}

module.exports = { signToken, verifyToken, decodeToken };

