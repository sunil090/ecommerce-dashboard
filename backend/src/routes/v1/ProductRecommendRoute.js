// src/routes/v1/product.routes.js
// Only recommendations endpoint added here to avoid colliding with your existing product CRUD.

const express = require("express")
const { recommend } = require("../../controllers/recommendation.controller")

const router = express.Router()

router.get("/recommendations", recommend)

module.exports = router
