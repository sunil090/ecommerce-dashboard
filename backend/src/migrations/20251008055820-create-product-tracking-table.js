'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_tracking', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      trackingType: {
        type: Sequelize.ENUM(
          'view',
          'click',
          'search_impression',
          'add_to_cart',
          'remove_from_cart',
          'wishlist_add',
          'wishlist_remove',
          'purchase',
          'review_view',
          'share',
          'image_view',
          'video_play'
        ),
        allowNull: false,
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      referrer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utmSource: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utmMedium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utmCampaign: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utmTerm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utmContent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      scrollDepth: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      metadata: {
        type: Sequelize.JSON,
        defaultValue: {},
      },
      location: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      deviceType: {
        type: Sequelize.ENUM('desktop', 'mobile', 'tablet'),
        allowNull: true,
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operatingSystem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
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

    await queryInterface.addIndex('product_tracking', ['productId', 'trackingType']);
    await queryInterface.addIndex('product_tracking', ['userId']);
    await queryInterface.addIndex('product_tracking', ['sessionId']);
    await queryInterface.addIndex('product_tracking', ['createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_tracking');
  }
};
