'use strict';
module.exports = (sequelize, DataTypes) => {
const Order = sequelize.define('Order', {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
userId: { type: DataTypes.UUID, allowNull: false },
orderNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
status: { type: DataTypes.ENUM('pending','confirmed','processing','shipped','delivered','cancelled','refunded'), defaultValue: 'pending' },
subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
taxAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
shippingAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
discountAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
totalAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
paymentStatus: { type: DataTypes.ENUM('pending','paid','failed','refunded'), defaultValue: 'pending' },
paymentMethod: { type: DataTypes.STRING, allowNull: false },
shippingAddress: { type: DataTypes.JSON, allowNull: false },
billingAddress: { type: DataTypes.JSON, allowNull: false },
notes: { type: DataTypes.TEXT, allowNull: true },
trackingNumber: { type: DataTypes.STRING, allowNull: true },
shippingCarrier: { type: DataTypes.STRING, allowNull: true },
estimatedDelivery: { type: DataTypes.DATE, allowNull: true },
}, {
tableName: 'orders',
timestamps: true
});


Order.associate = (models) => {
Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};


Order.generateOrderNumber = function() {
const timestamp = Date.now().toString();
const random = Math.floor(Math.random()*1000).toString().padStart(3,'0');
return `ORD-${timestamp}-${random}`;
};


return Order;
};