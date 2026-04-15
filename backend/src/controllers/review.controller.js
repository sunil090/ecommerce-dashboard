// src/controllers/review.controller.js

const reviewService = require("../services/review.service")
const { getPagination, paginatedResponse } = require("../utils/pagination")

async function add(req, res, next) {
  try {
    const review = await reviewService.addReview(req.body)
    res.status(201).json({ success: true, message: "Review added", data: review })
  } catch (e) {
    next(e)
  }
}

async function listByProduct(req, res, next) {
  try {
    const { page, limit, offset } = getPagination(req.query)
    const result = await reviewService.getReviewsByProduct(req.params.productId, { page, limit, offset })
    res.json(paginatedResponse(result, page, limit))
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const ok = await reviewService.deleteReview(req.params.id)
    if (!ok) return res.status(404).json({ success: false, message: "Review not found" })
    res.json({ success: true, message: "Review deleted" })
  } catch (e) {
    next(e)
  }
}

module.exports = { add, listByProduct, remove }
