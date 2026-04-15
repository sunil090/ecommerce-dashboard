// src/controllers/address.controller.js

const addressService = require("../services/address.service")
const { getPagination, paginatedResponse } = require("../utils/pagination")

async function create(req, res, next) {
  try {
    const address = await addressService.createAddress(req.body)
    res.status(201).json({ success: true, message: "Address created", data: address })
  } catch (e) {
    next(e)
  }
}

async function listByCustomer(req, res, next) {
  try {
    const { page, limit, offset } = getPagination(req.query)
    const result = await addressService.listAddressesByCustomer(req.params.customerId, { page, limit, offset })
    res.json(paginatedResponse(result, page, limit))
  } catch (e) {
    next(e)
  }
}

async function getById(req, res, next) {
  try {
    const address = await addressService.getAddressById(req.params.id)
    if (!address) return res.status(404).json({ success: false, message: "Address not found" })
    res.json({ success: true, message: "OK", data: address })
  } catch (e) {
    next(e)
  }
}

async function update(req, res, next) {
  try {
    const address = await addressService.updateAddress(req.params.id, req.body)
    if (!address) return res.status(404).json({ success: false, message: "Address not found" })
    res.json({ success: true, message: "Address updated", data: address })
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const ok = await addressService.deleteAddress(req.params.id)
    if (!ok) return res.status(404).json({ success: false, message: "Address not found" })
    res.json({ success: true, message: "Address deleted" })
  } catch (e) {
    next(e)
  }
}

module.exports = { create, listByCustomer, getById, update, remove }
