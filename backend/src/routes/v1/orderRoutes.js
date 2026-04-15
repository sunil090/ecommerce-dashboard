// src/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const asyncHandler = require('../../middlewares/async.middleware');
const { createOrderSchema } = require('../../validators/order.validator');
const validate = require('../../middlewares/validate');

// Create order with validation
router.post('/', validate(createOrderSchema), asyncHandler(orderController.createOrder));

router.get('/number/:orderNumber', asyncHandler(orderController.getOrderByNumber));
router.get('/user/:userId', asyncHandler(orderController.getUserOrders));

router.get('/', asyncHandler(orderController.getAllOrders));

router.get('/:id', asyncHandler(orderController.getOrderById));
router.patch('/:id', asyncHandler(orderController.updateOrder));
router.delete('/:id', asyncHandler(orderController.deleteOrder));

module.exports = router;