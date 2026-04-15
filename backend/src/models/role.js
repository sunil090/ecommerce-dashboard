// models/role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: DataTypes.STRING,
    },
    { tableName: "roles", underscored: true, timestamps: true },
  );

// models/role.js
Role.associate = (models) => {
  Role.belongsToMany(models.User, {
    through: {
      model: "user_roles",
      timestamps: false // Disable timestamps
    },
    foreignKey: "role_id",
    otherKey: "user_id",
    as: "users",
  });

  Role.belongsToMany(models.Permission, {
    through: {
      model: "role_permissions", 
      timestamps: false // Disable timestamps
    },
    foreignKey: "role_id",
    otherKey: "permission_id",
    as: "permissions",
  });
};

  return Role;
};
