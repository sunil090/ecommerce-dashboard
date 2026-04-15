// src/controllers/recommendation.controller.js

const { getRecommendations } = require("../services/recommendation.service")

async function recommend(req, res, next) {
  try {
    const customerId = req.query.customerId ? Number(req.query.customerId) : undefined
    const limit = req.query.limit ? Number(req.query.limit) : 10
    const data = await getRecommendations({ customerId, limit })
    res.json({ success: true, message: "OK", data })
  } catch (e) {
    next(e)
  }
}

module.exports = { recommend }
