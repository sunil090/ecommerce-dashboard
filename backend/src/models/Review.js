// src/models/review.js

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      productId: { type: DataTypes.BIGINT, allowNull: false, field: "product_id" },
      customerId: { type: DataTypes.BIGINT, allowNull: false, field: "customer_id" },
      rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
      comment: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "reviews",
      timestamps: true,
      underscored: true,
    },
  )

  return Review
}
