// require('dotenv').config();

// const common = {
//   dialect: 'postgres',
//   logging: false,
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// module.exports = {
//   development: {
//     username: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || 'postgres',
//     database: process.env.DB_NAME || 'postgres',
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: Number(process.env.DB_PORT) || 5432,
//     ...common,
//   },
//   test: {
//     username: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || 'postgres',
//     database: process.env.DB_NAME || 'myapp_test',
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: Number(process.env.DB_PORT) || 5432,
//     ...common,
//     logging: false,
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT) || 5432,
//     ...common,
//     logging: false,
//   },
// };

require('dotenv').config();  // Load environment variables

const common = {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    ...common,
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    ...common,
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    ...common,
    logging: false,
  },
};
