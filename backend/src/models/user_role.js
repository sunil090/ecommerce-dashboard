// models/user_role.js
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      tableName: "user_roles",
      underscored: true,
      timestamps: false,
    }
  );

  return UserRole;
};
    