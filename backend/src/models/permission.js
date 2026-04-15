// models/permission.js
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: DataTypes.STRING,
    },
    { tableName: "permissions", underscored: true, timestamps: true },
  );

// models/permission.js
Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: {
      model: "role_permissions",
      timestamps: false // Disable timestamps
    },
    foreignKey: "permission_id",
    otherKey: "role_id",
    as: "roles",
  });
};

  return Permission;
};
