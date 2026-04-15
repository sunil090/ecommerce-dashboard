'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shippings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      carrier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      trackingUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'label_created', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'),
        defaultValue: 'pending',
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      weight: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true,
      },
      dimensions: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      estimatedDelivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      actualDelivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shippedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      insuranceAmount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      signatureRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('shippings');
  },
};
