'use strict';
module.exports = (sequelize, DataTypes) => {
const OrderItem = sequelize.define('OrderItem', {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
orderId: { type: DataTypes.UUID, allowNull: false },
productId: { type: DataTypes.UUID, allowNull: false },
quantity: { type: DataTypes.INTEGER, allowNull: false },
unitPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
totalPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
productData: { type: DataTypes.JSON, allowNull: false }
}, {
tableName: 'order_items',
timestamps: true
});


OrderItem.associate = (models) => {
OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
};


OrderItem.beforeSave((item) => {
if (item.quantity && item.unitPrice) {
item.totalPrice = parseFloat(item.quantity) * parseFloat(item.unitPrice);
}
});


return OrderItem;
};