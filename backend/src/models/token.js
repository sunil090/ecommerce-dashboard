// src/models/token.js
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,  // Assuming UUID for userId
      allowNull: false,
      references: {
        model: 'users',  // Ensure this matches your table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Token;
};
