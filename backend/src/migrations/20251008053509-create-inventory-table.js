'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      reservedQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      lowStockThreshold: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      reorderPoint: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('in_stock', 'out_of_stock', 'discontinued', 'backordered'),
        defaultValue: 'in_stock',
      },
      lastRestocked: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nextRestockDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventory');
  },
};
