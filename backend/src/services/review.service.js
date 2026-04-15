// src/services/review.service.js

const { Review, Customer } = require("../models")

async function addReview(payload) {
  const review = await Review.create(payload)
  return review
}

async function getReviewsByProduct(productId, { page, limit, offset }) {
  const result = await Review.findAndCountAll({
    where: { productId },
    include: [{ model: Customer, as: "customer", attributes: ["id", "first_name", "last_name"] }],
    order: [["created_at", "DESC"]],
    limit,
    offset,
  })
  return result
}

async function deleteReview(id) {
  const count = await Review.destroy({ where: { id } })
  return count > 0
}

module.exports = {
  addReview,
  getReviewsByProduct,
  deleteReview,
}
