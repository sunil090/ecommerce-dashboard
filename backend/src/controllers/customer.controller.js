// src/controllers/customer.controller.js
const customerService = require("../services/customer.service")
const { getPagination, paginatedResponse } = require("../utils/pagination")

async function create(req, res, next) {
  try {
    const customer = await customerService.createCustomer(req.body)
    res.status(201).json({ success: true, message: "Customer created", data: customer })
  } catch (e) {
    next(e)
  }
}

async function list(req, res, next) {
  try {
    const { page, limit, offset } = getPagination(req.query)
    const search = req.query.search || ""
    const result = await customerService.listCustomers({ page, limit, offset, search })
    res.json(paginatedResponse(result, page, limit))
  } catch (e) {
    next(e)
  }
}

async function getById(req, res, next) {
  try {
    const customer = await customerService.getCustomerById(req.params.id)
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" })
    res.json({ success: true, message: "OK", data: customer })
  } catch (e) {
    next(e)
  }
}

async function update(req, res, next) {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body)
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" })
    res.json({ success: true, message: "Customer updated", data: customer })
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const ok = await customerService.deleteCustomer(req.params.id)
    if (!ok) return res.status(404).json({ success: false, message: "Customer not found" })
    res.json({ success: true, message: "Customer deleted" })
  } catch (e) {
    next(e)
  }
}

module.exports = { create, list, getById, update, remove }
