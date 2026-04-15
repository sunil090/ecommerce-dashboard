// src/validations/orderSchemas.js
const Joi = require('joi');

const uuidOrNumberString = Joi.alternatives().try(
  Joi.string().uuid(),
  Joi.string().alphanum(),
  Joi.number().integer()
);

// Item schema
const orderItemSchema = Joi.object({
  productId: Joi.string().uuid().required().label('productId'),
  quantity: Joi.number().integer().min(1).required().label('quantity')
});

// Address schema (keeps names consistent with service: addressLine1 / addressLine2 / postalCode / label)
const addressSchema = Joi.object({
  firstName: Joi.string().trim().required().label('firstName'),
  lastName: Joi.string().trim().required().label('lastName'),
  phone: Joi.string().trim().pattern(/^[0-9+\-\s]{7,20}$/).optional().label('phone'),
  addressLine1: Joi.string().trim().required().label('addressLine1'),
  addressLine2: Joi.string().trim().allow('', null).optional().label('addressLine2'),
  city: Joi.string().trim().required().label('city'),
  state: Joi.string().trim().required().label('state'),
  country: Joi.string().trim().required().label('country'),
  postalCode: Joi.string().trim().required().label('postalCode'),
  label: Joi.string().trim().allow('', null).optional().label('label')
}).required();

// Allowed payment methods (normalized in service)
const paymentMethods = ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery', 'cod', 'card', 'upi'];

// Create order schema
const createOrderSchema = Joi.object({
  // Accept either userId (preferred) or customerId
  userId: uuidOrNumberString.optional().label('userId'),

  customerId: uuidOrNumberString.optional().label('customerId'),

  items: Joi.array().items(orderItemSchema).min(1).required().label('items'),

  shippingAddress: addressSchema.label('shippingAddress'),
  billingAddress: addressSchema.label('billingAddress'),

  paymentMethod: Joi.string().valid(...paymentMethods).required().label('paymentMethod'),

  // Optional: allow partial fulfillment behavior
  allowPartial: Joi.boolean().optional().label('allowPartial'),

  notes: Joi.string().allow('', null).optional().label('notes')
})
  .or('userId', 'customerId') // require at least one identifier
  .required();

// Update order schema
const updateOrderSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded').optional().label('status'),
  paymentStatus: Joi.string().valid('pending', 'paid', 'failed', 'refunded', 'cancelled').optional().label('paymentStatus'),
  notes: Joi.string().allow('', null).optional().label('notes'),
  trackingNumber: Joi.string().optional().label('trackingNumber'),
  shippingCarrier: Joi.string().optional().label('shippingCarrier'),
  estimatedDelivery: Joi.date().iso().optional().label('estimatedDelivery')
});

const orderIdSchema = Joi.object({
  id: uuidOrNumberString.required().label('id')
});

const orderNumberSchema = Joi.object({
  orderNumber: Joi.string().required().label('orderNumber')
});

const userIdSchema = Joi.object({
  userId: uuidOrNumberString.required().label('userId')
});

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  status: Joi.string().valid('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded').optional(),
  paymentStatus: Joi.string().valid('pending', 'paid', 'failed', 'refunded', 'cancelled').optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional()
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  orderIdSchema,
  orderNumberSchema,
  userIdSchema,
  querySchema
};
