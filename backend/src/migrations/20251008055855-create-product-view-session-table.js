'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_view_sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      totalDuration: {
        type: Sequelize.INTEGER, // in seconds
        defaultValue: 0,
      },
      pageViews: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      scrollEvents: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clickEvents: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      averageScrollDepth: {
        type: Sequelize.INTEGER, // percentage
        defaultValue: 0,
      },
      exitIntent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      metadata: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_view_sessions');
  }
};
