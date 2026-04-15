// src/controllers/report.controller.js

const reportService = require("../services/report.service")

async function summary(_req, res, next) {
  try {
    const data = await reportService.getSalesSummary()
    res.json({ success: true, message: "OK", data })
  } catch (e) {
    next(e)
  }
}

async function topProducts(req, res, next) {
  try {
    const limit = Number(req.query.limit || 5)
    const data = await reportService.getTopSellingProducts({ limit })
    res.json({ success: true, message: "OK", data })
  } catch (e) {
    next(e)
  }
}

async function activeCustomers(req, res, next) {
  try {
    const limit = Number(req.query.limit || 5)
    const data = await reportService.getActiveCustomers({ limit })
    res.json({ success: true, message: "OK", data })
  } catch (e) {
    next(e)
  }
}

module.exports = { summary, topProducts, activeCustomers }
