'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit_card', 'debit_card', 'paypal', 'razorpay', 'cash_on_delivery', 'bank_transfer'),
        allowNull: false,
      },
      paymentGateway: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'USD',
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'),
        defaultValue: 'pending',
      },
      gatewayResponse: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      gatewayTransactionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refundAmount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      refundReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      refundedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      failureReason: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('payments');
  },
};
