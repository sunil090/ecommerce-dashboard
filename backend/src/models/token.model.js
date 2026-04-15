module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'Tokens', // ✅ important
      timestamps: true,
    }
  );

  return Token;
};
