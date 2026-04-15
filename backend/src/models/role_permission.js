// models/role_permission.js
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      // if your DB has created_at keep it, else remove this field
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // intentionally omit updated_at if your table doesn't have it
    },
    {
      tableName: "role_permissions",
      underscored: true,
      timestamps: false, // critical: prevents Sequelize expecting updated_at
    }
  );

  return RolePermission;
};
