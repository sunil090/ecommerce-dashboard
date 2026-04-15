// src/services/role.service.js
const { Role, User } = require('../models');
async function assignRoleToUser(userId, roleName) {
  const role = await Role.findOne({ where: { name: roleName }});
  if (!role) throw new Error('Role not found');
  const user = await User.findByPk(userId);
  await user.addRole(role); // Sequelize magic
}
module.exports = { assignRoleToUser };
