'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,  // Rating should be between 1 and 5
          max: 5,
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],  // Title can be empty, but if provided, max length is 255
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      isVerifiedPurchase: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,  // Default to false
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products', // Reference to the 'products' table
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // Reference to the 'users' table
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  },
};
