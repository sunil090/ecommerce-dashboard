const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const { isAuthenticated } = require('../../middlewares/auth.middleware'); // ✅ destructured
const validate = require('../../middlewares/validate');
const { addToCartSchema, updateCartSchema } = require('../../validators/cartValidation');

// Protect all routes
router.use(isAuthenticated);

// Cart routes
router.post('/', validate(addToCartSchema), cartController.addToCart);
router.get('/:userId', cartController.getUserCart);
router.put('/:userId/:productId', validate(updateCartSchema), cartController.updateCartItem);
router.delete('/:userId/:productId', cartController.removeFromCart);

module.exports = router;
