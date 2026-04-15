// src/services/recommendation.service.js

const { Product, Order, OrderItem, sequelize } = require("../models")
const { Op, literal } = require("sequelize")

// Basic strategy:
// 1) If customerId present, find their top categories by past orders, recommend products in those categories
// 2) Fallback to top-rated / most-reviewed products (requires reviews table)
// Assumes Product has categoryId. Adjust to your schema if different.
async function getRecommendations({ customerId, limit = 10 }) {
  if (customerId) {
    const [rows] = await sequelize.query(
      `
      SELECT p.category_id, COUNT(*) AS cnt
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE o.customer_id = :customerId
      GROUP BY p.category_id
      ORDER BY cnt DESC
      LIMIT 3
    `,
      { replacements: { customerId } },
    )

    const categoryIds = rows.map((r) => r.category_id).filter(Boolean)
    if (categoryIds.length) {
      const byCategory = await Product.findAll({
        where: { categoryId: { [Op.in]: categoryIds } },
        order: [["created_at", "DESC"]],
        limit,
      })
      if (byCategory.length) return byCategory
    }
  }

  // Fallback: most purchased products overall
  const popular = await Product.findAll({
    attributes: [
      "id",
      "name",
      "price",
      "categoryId",
      [
        literal(`(SELECT COALESCE(SUM(oi.quantity),0) FROM order_items oi WHERE oi.product_id = "Product".id)`),
        "qty_sold",
      ],
    ],
    order: [[literal("qty_sold"), "DESC"]],
    limit,
  })

  return popular
}

module.exports = { getRecommendations }
