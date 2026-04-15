'use strict';

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    userId: {                       // maps to DB column "userId"
      type: DataTypes.UUID,
      allowNull: false
      // no 'field' property - Sequelize will use attribute name as column name
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 }
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    productData: {
      type: DataTypes.JSONB || DataTypes.JSON,
      allowNull: true
    },

    customizations: {
      type: DataTypes.JSONB || DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    }
  }, {
    tableName: 'cart_items',
    underscored: false, // important: use camelCase column names in DB
    timestamps: true
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: 'productId', // matches attribute name and DB column "productId"
      targetKey: 'id',
      as: 'product'
    });

    if (models.User) {
      CartItem.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      });
    }
  };

  return CartItem;
};
