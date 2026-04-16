const OrderService = require('../services/order.service');
const ApiError = require('../utils/apiError');
const http = require('http');

function normalizeToApiError(err) {
  if (err instanceof ApiError) return err;

  if (err instanceof Error) {
    return new ApiError(err.message || 'Internal server error', err.statusCode || 500, { originalStack: err.stack });
  }

  if (typeof err === 'number' || (typeof err === 'string' && /^\d+$/.test(err))) {
    const status = Number(err);
    const message = http.STATUS_CODES[status] || 'Error';
    return new ApiError(message, Number.isInteger(status) ? status : 500);
  }

  if (typeof err === 'string') {
    return new ApiError(err, 400);
  }

  if (err && typeof err === 'object') {
    const msg = err.message || JSON.stringify(err);
    return new ApiError(msg, err.statusCode || 500, { original: err });
  }

  return new ApiError('Internal server error', 500);
}

// async function createOrder(req, res, next) {
//   try {
//     const order = await OrderService.createOrder(req.body);
//     return res.status(201).json({ success: true, order });
//   } catch (err) {
//     const apiErr = normalizeToApiError(err);
//     console.error('createOrder error:', { message: apiErr.message, statusCode: apiErr.statusCode, original: apiErr.meta?.originalStack || err });
//     return next(apiErr);
//   }
// }

async function createOrder(req, res) {
  try {
    const order = await OrderService.createOrder(req.body);
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
}

  

async function getOrderById(req, res, next) {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    return res.json({ success: true, order });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('getOrderById error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

async function getOrderByNumber(req, res, next) {
  try {
    const order = await OrderService.getOrderByNumber(req.params.orderNumber);
    return res.json({ success: true, order });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('getOrderByNumber error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

async function getUserOrders(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await OrderService.getUserOrders(req.params.userId, page, limit);
    return res.json({ success: true, ...result });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('getUserOrders error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      paymentStatus: req.query.paymentStatus,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await OrderService.getAllOrders(filters, page, limit);
    return res.json({ success: true, ...result });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('getAllOrders error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

async function updateOrder(req, res, next) {
  try {
    const updated = await OrderService.updateOrderStatus(req.params.id, req.body);
    return res.json({ success: true, order: updated });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('updateOrder error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const result = await OrderService.deleteOrder(req.params.id);
    return res.json({ success: true, ...result });
  } catch (err) {
    const apiErr = normalizeToApiError(err);
    console.error('deleteOrder error:', { message: apiErr.message, statusCode: apiErr.statusCode });
    return next(apiErr);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getOrderByNumber,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
};
