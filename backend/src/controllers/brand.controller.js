const brandService = require('../services/brand.service');

const brandController = {
  async createBrand(req, res) {
    try {
      const brand = await brandService.createBrand(req.body);
      res.status(201).json({
        success: true,
        message: 'Brand created successfully',
        data: brand
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getAllBrands(req, res) {
    try {
      const brands = await brandService.getAllBrands();
      res.status(200).json({
        success: true,
        data: brands
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async getBrandById(req, res) {
    try {
      const brand = await brandService.getBrandById(req.params.id);
      res.status(200).json({
        success: true,
        data: brand
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async updateBrand(req, res) {
    try {
      const brand = await brandService.updateBrand(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Brand updated successfully',
        data: brand
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async deleteBrand(req, res) {
    try {
      const result = await brandService.deleteBrand(req.params.id);
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

 async deactivateBrand(req, res) {
    try {
      const result = await brandService.softDeleteBrand(req.params.id);
      return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      return res.status(error.status || 400).json({ success: false, message: error.message });
    }
  },

  async activateBrand(req, res) {
    try {
      const result = await brandService.activateBrand(req.params.id);
      return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      return res.status(error.status || 400).json({ success: false, message: error.message });
    }
  }
};

module.exports = brandController;