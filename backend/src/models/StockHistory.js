const { DataTypes } = require('sequelize');

// Pass sequelize instance dynamically from index.js
module.exports = (sequelize) => {
  const StockHistory = sequelize.define('StockHistory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    previousStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    newStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changeAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changeType: {
      type: DataTypes.ENUM(
        'purchase',
        'restock',
        'adjustment',
        'return',
        'damage',
        'transfer_in',
        'transfer_out'
      ),
      allowNull: false,
    },
    referenceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'stock_history',
    timestamps: true,
    indexes: [
      {
        fields: ['productId', 'createdAt']
      }
    ]
  });

  return StockHistory;
};
