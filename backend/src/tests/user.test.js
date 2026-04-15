// testDb.js
require('dotenv').config();
const cfg = require('./src/config/config.js')[process.env.NODE_ENV || 'development'];
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('Sequelize config:', JSON.stringify(cfg, null, 2));
