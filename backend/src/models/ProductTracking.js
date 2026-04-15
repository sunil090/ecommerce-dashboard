const { DataTypes } = require('sequelize');

// The sequelize instance will be passed automatically from the index.js when models are loaded dynamically.
module.exports = (sequelize) => {
  const ProductTracking = sequelize.define('ProductTracking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    trackingType: {
      type: DataTypes.ENUM(
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utmSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utmMedium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utmCampaign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utmTerm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utmContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER, // in seconds
      defaultValue: 0,
    },
    scrollDepth: {
      type: DataTypes.INTEGER, // percentage
      defaultValue: 0,
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    deviceType: {
      type: DataTypes.ENUM('desktop', 'mobile', 'tablet'),
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operatingSystem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productId: {
      type: DataTypes.UUID, // Assuming you want to track products
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID, // Assuming you want to track users
      allowNull: false,
    },
  }, {
    tableName: 'product_tracking',
    timestamps: true,  // automatically handles createdAt and updatedAt
    indexes: [
      {
        fields: ['productId', 'trackingType']
      },
      {
        fields: ['userId']
      },
      {
        fields: ['sessionId']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  return ProductTracking;
};
