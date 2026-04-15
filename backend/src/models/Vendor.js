module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    businessPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessRegistrationNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    bankDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    storeDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    storePolicy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shippingPolicy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    returnPolicy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    pendingBalance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    totalProducts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'suspended', 'rejected'),
      defaultValue: 'pending',
    },
    verificationStatus: {
      type: DataTypes.ENUM('unverified', 'verified', 'under_review'),
      defaultValue: 'unverified',
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    socialMedia: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  }, {
    tableName: 'vendors',
    timestamps: true,
  });

  // Import User model for associations
  const User = sequelize.models.User;

  // Association
  User.hasOne(Vendor, { foreignKey: 'id', as: 'vendorProfile' });
  Vendor.belongsTo(User, { foreignKey: 'id', as: 'user' });

  return Vendor;
};
