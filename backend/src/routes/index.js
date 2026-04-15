const express = require('express');
const router = express.Router();

console.log('=== DEBUGGING ROUTE FILES ===');

// Import and debug each route file
const userRoutes = require('./v1/user.routes');
console.log('userRoutes type:', typeof userRoutes);

const brandRoutes = require('./v1/brand.routes');
console.log('brandRoutes type:', typeof brandRoutes);
console.log('brandRoutes value:', brandRoutes);

const categoryRoutes = require('./v1/category.routes');
console.log('categoryRoutes type:', typeof categoryRoutes);

const productRoutes = require('./v1/product.routes');
console.log('productRoutes type:', typeof productRoutes);

const orderRoutes = require('./v1/orderRoutes');
console.log('orderRoutes type:', typeof orderRoutes);

const cartRoutes = require('./v1/cartRoutes');
console.log('cartRoutes type:', typeof cartRoutes);

const paymentRoutes = require('./v1/paymentRoutes');
console.log('paymentRoutes type:', typeof paymentRoutes);

console.log('=== END DEBUGGING ===');
const customerRoutes = require("./v1/customer.routes")
const addressRoutes = require("./v1/address.routes")
const reportRoutes = require("./v1/report.routes")
const reviewRoutes = require("./v1/review.routes")
const ProductRecommendRoute = require("./v1/ProductRecommendRoute")
// Use routes with appropriate prefixes
router.use('/v1/brands', brandRoutes);
router.use('/v1/categories', categoryRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/orders', orderRoutes);
router.use('/v1/cart', cartRoutes);
router.use('/v1/payments', paymentRoutes);

router.use("/v1/customers", customerRoutes)
router.use("/v1/addresses", addressRoutes)
router.use("/v1/reports", reportRoutes)
router.use("/v1/reviews", reviewRoutes)
router.use("/v1/products", ProductRecommendRoute)

module.exports = router;