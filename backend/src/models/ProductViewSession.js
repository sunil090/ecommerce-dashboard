const { DataTypes } = require('sequelize');

// Pass sequelize instance dynamically from index.js
module.exports = (sequelize) => {
  const ProductViewSession = sequelize.define('ProductViewSession', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalDuration: {
      type: DataTypes.INTEGER, // in seconds
      defaultValue: 0,
    },
    pageViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    scrollEvents: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clickEvents: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageScrollDepth: {
      type: DataTypes.INTEGER, // percentage
      defaultValue: 0,
    },
    exitIntent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  }, {
    tableName: 'product_view_sessions',
    timestamps: true,
  });

  return ProductViewSession;
};
