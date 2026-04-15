'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 255],
        },
      },
      companyLogo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      businessPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taxNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessRegistrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessAddress: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      bankDetails: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      storeDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      storePolicy: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shippingPolicy: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      returnPolicy: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      commissionRate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      totalEarnings: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      pendingBalance: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      totalProducts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      totalReviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'suspended', 'rejected'),
        defaultValue: 'pending',
      },
      verificationStatus: {
        type: Sequelize.ENUM('unverified', 'verified', 'under_review'),
        defaultValue: 'unverified',
      },
      verifiedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      socialMedia: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',  // Make sure this matches the table name in the User model
          key: 'id',
        },
        allowNull: true, // Adjust according to your requirement
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendors');
  },
};
