'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('percentage', 'fixed_amount', 'free_shipping'),
        allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      minOrderAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      maxDiscountAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      usageLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      usedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      perUserLimit: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      appliesTo: {
        type: Sequelize.ENUM('all_products', 'specific_products', 'specific_categories'),
        defaultValue: 'all_products',
      },
      productIds: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      categoryIds: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      excludedProductIds: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      customerEligibility: {
        type: Sequelize.ENUM('all_customers', 'specific_customers', 'new_customers'),
        defaultValue: 'all_customers',
      },
      customerIds: {
        type: Sequelize.JSON,
        defaultValue: [],
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
    await queryInterface.dropTable('coupons');
  },
};
