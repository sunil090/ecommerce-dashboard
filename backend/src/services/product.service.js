// src/services/productService.js
const { Product, Brand, Category } = require('../models');

class ProductService {
async createProduct(productData) {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    console.error('🧩 Sequelize Validation Error:', error.errors?.map(e => e.message));
    throw new Error(`Error creating product: ${error.message}`);
  }
}



  async getAllProducts() {
    try {
      const products = await Product.findAll({
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
        ],
        order: [['createdAt', 'DESC']],
      });
      return products;
    } catch (error) {
      throw new Error(`Error retrieving products: ${error.message}`);
    }
  }

  // ➤ Get a single product by ID (with brand + category)
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
        ],
      });

      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      throw new Error(`Error retrieving product: ${error.message}`);
    }
  }

  // ➤ Update product
  async updateProduct(id, updateData) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error('Product not found');

      await product.update(updateData);
      return product;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // ➤ Delete product permanently
  async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error('Product not found');

      await product.destroy();
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async activateProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error('Product not found');

      await product.update({ isActive: true });
      return { message: 'Product activated successfully' };
    } catch (error) {
      throw new Error(`Error activating product: ${error.message}`);
    }
  }
  async softDeleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error('Product not found');

      await product.update({ isActive: false });
      return { message: 'Product deactivated successfully' };
    } catch (error) {
      throw new Error(`Error deactivating product: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
