// src/repositories/user.repository.js
const { User } = require('../models');

async function findById(id) {
  return User.findByPk(id);
}

async function findByUuid(uuid) {
  // only call this if your Users table actually has a `uuid` column
  return User.findOne({ where: { uuid } });
}

module.exports = { findById, findByUuid };
