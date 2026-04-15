const bcrypt = require('bcryptjs');
const { signToken, decodeToken } = require('../utils/token');
const ApiError = require('../utils/apiError');
const db = require('../models');  // Import the db object

// --- Create a new user ---
const createUser = async ({ email, password, name }) => {
  try {
    // Check if user already exists - use db.User
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) throw new ApiError(400, 'Email already in use');

    console.log('🔍 Hashing password...');
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('🔍 Creating user...');
    // Create new user
    const user = await db.User.create({ 
      email, 
      password: hashedPassword, 
      name 
    });

    console.log('🔍 User created successfully:', user.id);
    
    // Generate JWT token
   // Generate JWT token
const token = signToken({ sub: String(user.id), email: user.email });


    return { user, token };
  } catch (err) {
    console.error('🔥 DB ERROR in createUser:', err);
    throw err;
  }
};

// --- Authenticate user login ---
const authenticateUser = async (email, password) => {
  try {
    if (!email || !password) throw new ApiError(400, 'Email and password required');

    console.log('🔍 Authenticating user:', email);
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw new ApiError(401, 'Invalid credentials');

    console.log('Entered:', password);
console.log('Hash:', user.password);

const isMatch = await bcrypt.compare(password, user.password);
console.log('Match:', isMatch);
    if (!isMatch) throw new ApiError(401, 'Invalid credentials');

    const token = signToken({ sub: user.id, email: user.email });
    return { user, token };
  } catch (err) {
    console.error('🔥 DB ERROR in authenticateUser:', err);
    throw err;
  }
};

const logoutToken = async (token) => {
  if (!token) throw new ApiError(400, 'Authorization token required');

  const decoded = decodeToken(token);  
  let expiresAt = null;
  if (decoded && decoded.exp) expiresAt = new Date(decoded.exp * 1000);

  return true; 
};

module.exports = { createUser, authenticateUser, logoutToken };