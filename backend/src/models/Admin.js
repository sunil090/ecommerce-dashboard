// src/models/Admin.js

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'admins',
    timestamps: true,
  });

  // Association
  Admin.associate = (models) => {
    Admin.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
    models.User.hasOne(Admin, { foreignKey: 'id', as: 'adminProfile' });
  };

  return Admin;
};
