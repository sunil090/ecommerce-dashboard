// src/models/Coupon.js

module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('percentage', 'fixed_amount', 'free_shipping'),
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    minOrderAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    maxDiscountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    perUserLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    appliesTo: {
      type: DataTypes.ENUM('all_products', 'specific_products', 'specific_categories'),
      defaultValue: 'all_products',
    },
    productIds: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    categoryIds: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    excludedProductIds: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    customerEligibility: {
      type: DataTypes.ENUM('all_customers', 'specific_customers', 'new_customers'),
      defaultValue: 'all_customers',
    },
    customerIds: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  }, {
    tableName: 'coupons',
    timestamps: true,
  });

  return Coupon;
};
