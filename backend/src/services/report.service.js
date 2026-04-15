// src/services/report.service.js

const { sequelize, Order, OrderItem, Product, Customer } = require("../models")
const { fn, col, literal } = require("sequelize")

async function getSalesSummary() {
  // Total sales and order counts
  const [[agg]] = await sequelize.query(`
    SELECT
      COALESCE(SUM(total_amount), 0)::numeric(12,2) AS total_sales,
      COUNT(*) AS total_orders
    FROM orders
    WHERE payment_status = 'paid'
  `)

  return {
    total_sales: agg.total_sales,
    total_orders: Number(agg.total_orders),
  }
}

async function getTopSellingProducts({ limit = 5 }) {
  const rows = await OrderItem.findAll({
    attributes: [
      "productId",
      [fn("SUM", col("quantity")), "total_quantity"],
      [fn("SUM", col("price")), "total_revenue"],
    ],
    include: [{ model: Product, as: "product", attributes: ["name", "price", "categoryId"] }],
    group: ["OrderItem.product_id", "product.id"],
    order: [[literal("total_quantity"), "DESC"]],
    limit,
  })

  return rows.map((r) => ({
    productId: r.productId,
    productName: r.product?.name,
    total_quantity: Number(r.get("total_quantity")),
    total_revenue: Number(r.get("total_revenue")),
  }))
}

async function getActiveCustomers({ limit = 5 }) {
  const rows = await Order.findAll({
    attributes: ["customerId", [fn("COUNT", col("id")), "order_count"]],
    group: ["customer_id"],
    order: [[literal("order_count"), "DESC"]],
    limit,
    include: [{ model: Customer, as: "customer", attributes: ["first_name", "last_name", "email"] }],
  })

  return rows.map((r) => ({
    customerId: r.customerId,
    customerName: `${r.customer?.first_name || ""} ${r.customer?.last_name || ""}`.trim(),
    email: r.customer?.email,
    order_count: Number(r.get("order_count")),
  }))
}

module.exports = {
  getSalesSummary,
  getTopSellingProducts,
  getActiveCustomers,
}
