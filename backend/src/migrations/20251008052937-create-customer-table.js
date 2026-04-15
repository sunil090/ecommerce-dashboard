'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      loyaltyPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalSpent: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      customerSince: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      preferences: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      shippingAddresses: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      billingAddresses: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      defaultShippingAddress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      defaultBillingAddress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      wishlist: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      newsletterSubscribed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: true, // Adjust according to your requirement
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
    await queryInterface.dropTable('customers');
  },
};
