// src/models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [2, 255] },
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { isDecimal: true, min: 0 },
    },
    sku: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'draft'),
      defaultValue: 'active',
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'brand_id',
      references: { model: 'brands', key: 'id' },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'category_id',
      references: { model: 'categories', key: 'id' },
    },
  }, {
    tableName: 'products',
    timestamps: true,
  });

  // ✅ Fix: add aliases here
  Product.associate = (models) => {
    Product.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return Product;
};
