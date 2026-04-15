const cartService = require('../services/cartService');

const addToCart = async (req, res) => {
  try {
    const authUserId = req.user && req.user.id;
    const userId = authUserId || req.body.userId;
    const { productId, quantity } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });
    if (!productId) return res.status(400).json({ success: false, message: 'productId required' });

    const result = await cartService.addToCart(userId, productId, quantity);

    if (result && result.error === 'OUT_OF_STOCK') {
      return res.status(409).json({
        success: false,
        code: 'OUT_OF_STOCK',
        message: result.message,
        product: result.product
      });
    }

    if (result && result.items) {
      const status = result.warning ? 200 : 201;
      const body = { success: true, message: 'Product added to cart', data: result };
      if (result.warning) body.warning = result.warning;
      return res.status(status).json(body);
    }

    return res.status(200).json({ success: true, message: 'Product added to cart', data: result });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const authUserId = req.user && req.user.id;
    const paramId = req.params.userId;
    const userId = authUserId || paramId;

    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });

    const cart = await cartService.getUserCart(userId);
    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const authUserId = req.user && req.user.id;
    const userId = authUserId || req.params.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });

    const cart = await cartService.updateCartItem(userId, productId, quantity);
    return res.status(200).json({ success: true, message: 'Cart updated successfully', data: cart });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const authUserId = req.user && req.user.id;
    const userId = authUserId || req.params.userId;
    const { productId } = req.params;

    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });

    const cart = await cartService.removeFromCart(userId, productId);
    return res.status(200).json({ success: true, message: 'Product removed from cart', data: cart });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, getUserCart, updateCartItem, removeFromCart };
