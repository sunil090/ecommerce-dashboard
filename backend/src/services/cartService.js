'use strict';

const db = require('../models');
const { CartItem, Product, sequelize } = db;


// build snapshot stored in productData
const buildProductSnapshot = (productInstance) => {
  if (!productInstance) return null;
  return {
    id: productInstance.id,
    name: productInstance.name ?? null,
    sku: productInstance.sku ?? null,
    price: productInstance.price ?? null,
    description: productInstance.description ?? null,
    status: productInstance.status ?? null
  };
};

// fetch user items and include Product association
const fetchUserItems = async (userId, transaction = null) => {
  const opts = {
    where: { userId },
    order: [['createdAt', 'ASC']],
    include: []
  };
  if (transaction) opts.transaction = transaction;

  // include product only if model exists
  if (Product) {
    // must use same alias as in CartItem.associate -> as: 'product'
    opts.include.push({ model: Product, as: 'product' });
  }

  const items = await CartItem.findAll(opts);
  return items;
};

const addToCart = async (userId, productId, quantity = 1, extra = {}) => {
  if (!userId) throw new Error('userId required');
  if (!productId) throw new Error('productId required');
  quantity = Number(quantity);
  if (Number.isNaN(quantity) || quantity < 1) throw new Error('quantity must be >= 1');

  // use transaction when available
  if (sequelize && sequelize.transaction) {
    return await sequelize.transaction(async (t) => {
      const product = Product ? await Product.findByPk(productId, { transaction: t }) : null;
      if (Product && !product) throw new Error('Product not found');

      const isActive = product
        ? (typeof product.isActive === 'boolean'
            ? product.isActive
            : (typeof product.status === 'string' ? product.status.toLowerCase() === 'active' : true))
        : true;

      const available = product
        ? (typeof product.stockQuantity === 'number'
            ? product.stockQuantity
            : (typeof product.quantity === 'number' ? product.quantity : null))
        : null;

      if (!isActive) {
        return {
          error: 'OUT_OF_STOCK',
          message: 'Product out of stock',
          product: product ? buildProductSnapshot(product) : null
        };
      }
      if (available !== null && available <= 0) {
        return {
          error: 'OUT_OF_STOCK',
          message: 'Product out of stock',
          product: product ? buildProductSnapshot(product) : null
        };
      }

      // find existing cart item for this user + product
      let item = await CartItem.findOne({ where: { userId, productId }, transaction: t });
      const existingQty = item ? (Number(item.quantity) || 0) : 0;
      const desiredQty = existingQty + quantity;

      // If available is known and desired exceeds stock, cap
      if (available !== null && desiredQty > available) {
        const capped = available;
        if (item) {
          item.quantity = capped;
          if (product && product.price != null) {
            item.unitPrice = product.price;
            item.totalPrice = Number(product.price) * capped;
          }
          await item.save({ transaction: t });
        } else {
          const unitPrice = product && product.price != null ? product.price : extra.unitPrice ?? null;
          item = await CartItem.create({
            userId,
            productId,
            quantity: capped,
            unitPrice,
            totalPrice: unitPrice != null ? Number(unitPrice) * capped : null,
            productData: product ? buildProductSnapshot(product) : (extra.productData ?? null),
            customizations: extra.customizations ?? null
          }, { transaction: t });
        }
        const items = await fetchUserItems(userId, t);
        return { items, warning: `Requested quantity exceeds available stock. Quantity set to available stock (${capped}).` };
      }

      // normal path: update or create
      if (item) {
        item.quantity = desiredQty;
        if (product && product.price != null) {
          item.unitPrice = product.price;
          item.totalPrice = Number(product.price) * item.quantity;
        } else if (item.unitPrice != null) {
          item.totalPrice = Number(item.unitPrice) * item.quantity;
        }
        await item.save({ transaction: t });
      } else {
        const unitPrice = product && product.price != null ? product.price : extra.unitPrice ?? null;
        const totalPrice = unitPrice != null ? Number(unitPrice) * desiredQty : null;
        item = await CartItem.create({
          userId,
          productId,
          quantity: desiredQty,
          unitPrice,
          totalPrice,
          productData: product ? buildProductSnapshot(product) : (extra.productData ?? null),
          customizations: extra.customizations ?? null
        }, { transaction: t });
      }

      const items = await fetchUserItems(userId, t);
      return { items };
    });
  }

  // fallback without transaction
  const product = Product ? await Product.findByPk(productId) : null;
  if (Product && !product) throw new Error('Product not found');

  const isActive = product
    ? (typeof product.isActive === 'boolean'
        ? product.isActive
        : (typeof product.status === 'string' ? product.status.toLowerCase() === 'active' : true))
    : true;
  const available = product
    ? (typeof product.stockQuantity === 'number'
        ? product.stockQuantity
        : (typeof product.quantity === 'number' ? product.quantity : null))
    : null;

  if (!isActive) return { error: 'OUT_OF_STOCK', message: 'Product out of stock', product: product ? buildProductSnapshot(product) : null };
  if (available !== null && available <= 0) return { error: 'OUT_OF_STOCK', message: 'Product out of stock', product: product ? buildProductSnapshot(product) : null };

  let item = await CartItem.findOne({ where: { userId, productId } });
  const existingQty = item ? (Number(item.quantity) || 0) : 0;
  const desiredQty = existingQty + quantity;

  if (available !== null && desiredQty > available) {
    const capped = available;
    if (item) {
      item.quantity = capped;
      if (product && product.price != null) { item.unitPrice = product.price; item.totalPrice = Number(product.price) * capped; }
      await item.save();
    } else {
      const unitPrice = product && product.price != null ? product.price : extra.unitPrice ?? null;
      item = await CartItem.create({
        userId, productId, quantity: capped, unitPrice, totalPrice: unitPrice != null ? Number(unitPrice) * capped : null,
        productData: product ? buildProductSnapshot(product) : (extra.productData ?? null), customizations: extra.customizations ?? null
      });
    }
    const items = await fetchUserItems(userId);
    return { items, warning: `Requested quantity exceeds available stock. Quantity set to available stock (${capped}).` };
  }

  if (item) {
    item.quantity = desiredQty;
    if (product && product.price != null) { item.unitPrice = product.price; item.totalPrice = Number(product.price) * item.quantity; }
    else if (item.unitPrice != null) item.totalPrice = Number(item.unitPrice) * item.quantity;
    await item.save();
  } else {
    const unitPrice = product && product.price != null ? product.price : extra.unitPrice ?? null;
    item = await CartItem.create({
      userId, productId, quantity: desiredQty, unitPrice, totalPrice: unitPrice != null ? Number(unitPrice) * desiredQty : null,
      productData: product ? buildProductSnapshot(product) : (extra.productData ?? null), customizations: extra.customizations ?? null
    });
  }

  const items = await fetchUserItems(userId);
  return { items };
};

const getUserCart = async (userId) => {
  if (!userId) throw new Error('userId required');

  // fetch items with product included (if available)
  const items = await fetchUserItems(userId);

  // compute summary
  let totalItems = 0;
  let totalAmount = 0;
  for (const it of items) {
    const qty = Number(it.quantity) || 0;
    totalItems += qty;
    const tp = Number(it.totalPrice) || (it.product && it.product.price ? Number(it.product.price) * qty : 0);
    totalAmount += tp;
  }

  return { items, summary: { totalItems, totalAmount } };
};

const updateCartItem = async (userId, productId, quantity) => {
  if (!userId) throw new Error('userId required');
  if (!productId) throw new Error('productId required');
  quantity = Number(quantity);
  if (Number.isNaN(quantity) || quantity < 0) throw new Error('quantity must be >= 0');

  const item = await CartItem.findOne({ where: { userId, productId } });
  if (!item) throw new Error('Product not found in cart');

  if (quantity === 0) {
    await item.destroy();
  } else {
    item.quantity = quantity;
    if (item.unitPrice != null) item.totalPrice = Number(item.unitPrice) * item.quantity;
    await item.save();
  }

  const items = await fetchUserItems(userId);
  return { items };
};

const removeFromCart = async (userId, productId) => {
  if (!userId) throw new Error('userId required');
  if (!productId) throw new Error('productId required');

  await CartItem.destroy({ where: { userId, productId } });
  const items = await fetchUserItems(userId);
  return { items };
};

module.exports = { addToCart, getUserCart, updateCartItem, removeFromCart };
