const productService = require('../services/product.service');

const productController = {
  
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },
async activateProduct(req, res) {
  try {
    const result = await productService.activateProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
},

  async deactivateProduct(req, res) {
    try {
      const result = await productService.softDeleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // async getProductsByBrand(req, res) {
  //   try {
  //     const products = await productService.getProductsByBrand(req.params.brandId);
  //     res.status(200).json({
  //       success: true,
  //       data: products
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // },

  // async getProductsByCategory(req, res) {
  //   try {
  //     const products = await productService.getProductsByCategory(req.params.categoryId);
  //     res.status(200).json({
  //       success: true,
  //       data: products
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }
};

module.exports = productController;