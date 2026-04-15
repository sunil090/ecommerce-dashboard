// src/models/address.js
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: "id",
      },

      // use a clear JS attribute name to avoid accidental overwrites
      addressType: {
        type: DataTypes.ENUM("shipping", "billing", "office", "home", "other"),
        allowNull: false,
        defaultValue: "home",
        field: "type",
      },

      // Names Sequelize will use in JS code — mapped to DB columns with field
      firstName: { type: DataTypes.STRING(150), allowNull: false, field: "firstName" },
      lastName: { type: DataTypes.STRING(150), allowNull: true, field: "lastName" },

      // address lines
      addressLine1: { type: DataTypes.STRING(255), allowNull: true, field: "addressLine1" },
      addressLine2: { type: DataTypes.STRING(255), allowNull: true, field: "addressLine2" },

      // other columns
      phone: { type: DataTypes.STRING(20), allowNull: true, field: "phone" },
      company: { type: DataTypes.STRING(255), allowNull: true, field: "company" },

      city: { type: DataTypes.STRING(100), allowNull: true, field: "city" },
      state: { type: DataTypes.STRING(100), allowNull: true, field: "state" },
      country: { type: DataTypes.STRING, allowNull: false, field: "country" },
      postalCode: { type: DataTypes.STRING(32), allowNull: true, field: "postalCode" },

      label: { type: DataTypes.STRING(100), allowNull: true, field: "label" },

      isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "isDefault" },

      customerId: { type: DataTypes.UUID, allowNull: true, field: "customer_id" },

      createdAt: { type: DataTypes.DATE, allowNull: true, field: "createdAt" },
      updatedAt: { type: DataTypes.DATE, allowNull: true, field: "updatedAt" },
    },
    {
      tableName: "addresses",
      timestamps: true,
      underscored: false,
    }
  );

  Address.associate = (models) => {
    Address.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      targetKey: "id",
      as: "customer",
    });
  };

  return Address;
};
