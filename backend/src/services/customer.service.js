// src/services/customer.service.js

const bcrypt = require("bcryptjs")
const { Customer, Address, Order } = require("../models")
const { Op } = require("sequelize")

async function createCustomer(payload) {
  const { password, ...rest } = payload
  const password_hash = await bcrypt.hash(password, 10)
  const customer = await Customer.create({ ...rest, password_hash })
  return customer
}

async function listCustomers({ page, limit, offset, search }) {
  const where = {}
  if (search) {
    where[Op.or] = [
      { first_name: { [Op.iLike]: `%${search}%` } },
      { last_name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ]
  }
  const result = await Customer.findAndCountAll({
    where,
    limit,
    offset,
    order: [["created_at", "DESC"]],
    include: [
      { model: Address, as: "addresses", limit: 1 },
     { model: Order, as: "orders", attributes: ["id", "totalAmount", "status"], limit: 1 },
    ],
  })
  return result
}

async function getCustomerById(id) {
  const customer = await Customer.findByPk(id, {
    include: [{ model: Address, as: "addresses" }],
  })
  return customer
}

async function updateCustomer(id, payload) {
  const customer = await Customer.findByPk(id)
  if (!customer) return null
  if (payload.password) {
    customer.password_hash = await bcrypt.hash(payload.password, 10)
  }
  Object.assign(customer, { ...payload, password: undefined })
  await customer.save()
  return customer
}

async function deleteCustomer(id) {
  const count = await Customer.destroy({ where: { id } })
  return count > 0
}

module.exports = {
  createCustomer,
  listCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}
