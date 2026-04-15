// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: false,
  });

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: {
        model: 'user_roles',
        timestamps: false // Disable timestamps for junction table
      },
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles'
    });
  };

  return User;
};