'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },

    sessionId: {
      type: DataTypes.STRING,
      allowNull: true
    },

    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    totalItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    discountAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    taxAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    shippingAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD'
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'carts',
    underscored: false,
    timestamps: true
  });

  Cart.associate = (models) => {
    // link Cart -> CartItem using userId (based on your current cart_items schema)
    Cart.hasMany(models.CartItem, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      as: 'items'
    });

    if (models.User) {
      Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  return Cart;
};
