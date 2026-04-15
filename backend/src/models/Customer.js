// // src/models/customer.js

// module.exports = (sequelize, DataTypes) => {
//   const Customer = sequelize.define(
//     "Customer",
//     {
//       id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
//       first_name: { type: DataTypes.STRING(100), allowNull: false },
//       last_name: { type: DataTypes.STRING(100), allowNull: false },
//       email: { type: DataTypes.STRING(160), allowNull: false, unique: true, validate: { isEmail: true } },
//       phone: { type: DataTypes.STRING(20), allowNull: true },
//       password_hash: { type: DataTypes.STRING(255), allowNull: false },
//       gender: { type: DataTypes.ENUM("male", "female", "other"), allowNull: true },
//       dob: { type: DataTypes.DATEONLY, allowNull: true },
//     },
//     {
//       tableName: "customers",
//       timestamps: true,
//       underscored: true,
//       indexes: [{ fields: ["email"], unique: true }],
//     },
//   )

//   return Customer
// }
// src/models/customer.js

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // auto-generate UUIDs if not provided
      },
      first_name: { type: DataTypes.STRING(100), allowNull: false },
      last_name: { type: DataTypes.STRING(100), allowNull: false },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: { type: DataTypes.STRING(20), allowNull: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
      dob: { type: DataTypes.DATEONLY, allowNull: true },
      loyaltyPoints: { type: DataTypes.INTEGER, defaultValue: 0 },
      totalOrders: { type: DataTypes.INTEGER, defaultValue: 0 },
      totalSpent: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      customerSince: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      preferences: { type: DataTypes.JSON, allowNull: true },
      shippingAddresses: { type: DataTypes.JSON, allowNull: true },
      billingAddresses: { type: DataTypes.JSON, allowNull: true },
      defaultShippingAddress: { type: DataTypes.INTEGER, allowNull: true },
      defaultBillingAddress: { type: DataTypes.INTEGER, allowNull: true },
      wishlist: { type: DataTypes.JSON, allowNull: true },
    },
    {
      tableName: "customers",
      timestamps: true,
      underscored: true,
      indexes: [{ fields: ["email"], unique: true }],
    }
  );
Customer.associate = (models) => {
  Customer.hasMany(models.Address, {
    foreignKey: "customer_id", // DB column name in addresses table
    sourceKey: "id",
    as: "addresses",
  });

  // If you have an Order model
 if (models.Order) {
  Customer.hasMany(models.Order, {
    foreignKey: "userId",   
    sourceKey: "id",
    as: "orders",
  });
}
};

return Customer;
};