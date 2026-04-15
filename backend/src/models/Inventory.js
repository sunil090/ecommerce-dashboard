module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    reservedQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    lowStockThreshold: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    reorderPoint: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('in_stock', 'out_of_stock', 'discontinued', 'backordered'),
      defaultValue: 'in_stock',
    },
    lastRestocked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nextRestockDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'inventory',
    timestamps: true,
  });

  // Associations
  Inventory.associate = function (models) {
    // Reference to InventoryLog
    models.Inventory.hasMany(models.InventoryLog, { foreignKey: 'inventoryId', as: 'logs' });
  };

  return Inventory;
};
