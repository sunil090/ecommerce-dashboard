// src/services/order.service.js

const { error } = require("winston")
const { sequelize, Order, OrderItem, Product, Customer } = require("../models")
const { Op } = require("sequelize")

// async function createOrder({ customerId, items, payment_mode }) {
//   // Validate customer exists
//   const customer = await Customer.findByPk(customerId)
//   if (!customer) throw Object.assign(new Error("Customer not found"), { status: 404 })

//   // Load product prices
//   const productIds = items.map((i) => i.productId)
//   const products = await Product.findAll({ where: { id: { [Op.in]: productIds } } })
//   if (products.length !== productIds.length)
//     throw Object.assign(new Error("One or more products not found"), { status: 400 })

//   const priceMap = new Map(products.map((p) => [String(p.id), Number.parseFloat(p.price)]))
//   const t = await sequelize.transaction()

//   try {
//     const calcTotal = items.reduce((sum, i) => sum + (priceMap.get(String(i.productId)) || 0) * i.quantity, 0)

//     const order = await Order.create(
//       {
//         customerId,
//         total_amount: calcTotal.toFixed(2),
//         payment_status: "pending",
//         order_status: "pending",
//         payment_mode,
//         order_date: new Date(),
//       },
//       { transaction: t },
//     )

//     const orderItems = items.map((i) => ({
//       orderId: order.id,
//       productId: i.productId,
//       quantity: i.quantity,
//       price: (priceMap.get(String(i.productId)) || 0).toFixed(2),
//     }))

//     await OrderItem.bulkCreate(orderItems, { transaction: t })

//     await t.commit()

//     const created = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: "items" }] })
//     return created
//   } catch (e) {
//     await t.rollback()
//     throw e
//   }
// }

async function  createOrder(){
  

}




async function updateOrderStatus(orderId, payload) {
  const order = await Order.findByPk(orderId)
  if (!order) return null

  if (payload.payment_status) order.payment_status = payload.payment_status
  if (payload.order_status) order.order_status = payload.order_status

  await order.save()
  return order
}

async function getOrderById(orderId) {
  const order = await Order.findByPk(orderId, { include: [{ model: OrderItem, as: "items" }] })
  return order
}

async function listOrdersForCustomer(customerId, { page, limit, offset }) {
  const result = await Order.findAndCountAll({
    where: { customerId },
    include: [{ model: OrderItem, as: "items" }],
    order: [["created_at", "DESC"]],
    limit,
    offset,
  })
  return result
}

async function listOrdersForAdmin({ page, limit, offset, status }) {
  const where = {}
  if (status) {
    where.order_status = status
  }
  const result = await Order.findAndCountAll({
    where,
    include: [{ model: OrderItem, as: "items" }],
    order: [["created_at", "DESC"]],
    limit,
    offset,
  })
  return result
}

module.exports = {
  // createOrder,

  createOrder,
  updateOrderStatus,
  getOrderById,
  listOrdersForCustomer,
  listOrdersForAdmin,
}
