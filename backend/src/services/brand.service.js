const { Brand } = require('../models');

class BrandService {
  async createBrand(brandData) {
    try {
      const brand = await Brand.create(brandData);
      return brand;
    } catch (error) {
      throw new Error(`Error creating brand: ${error.message}`);
    }
  }

  async getAllBrands() {
    try {
      const brands = await Brand.findAll({
        where: { isActive: true },
        order: [['name', 'ASC']]
      });
      return brands;
    } catch (error) {
      throw new Error(`Error retrieving brands: ${error.message}`);
    }
  }

  async getBrandById(id) {
    try {
      const brand = await Brand.findByPk(id);
      if (!brand) {
        throw new Error('Brand not found');
      }
      return brand;
    } catch (error) {
      throw new Error(`Error retrieving brand: ${error.message}`);
    }
  }

  async updateBrand(id, updateData) {
    try {
      const brand = await Brand.findByPk(id);
      if (!brand) {
        throw new Error('Brand not found');
      }
      
      await brand.update(updateData);
      return brand;
    } catch (error) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  }

  async deleteBrand(id) {
    try {
      const brand = await Brand.findByPk(id);
      if (!brand) {
        throw new Error('Brand not found');
      }
      
      await brand.destroy();
      return { message: 'Brand deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting brand: ${error.message}`);
    }
  }

 async softDeleteBrand(id) {
    try {
      if (!id) throw new Error('Invalid id');

      const brand = await Brand.findByPk(id);
      if (!brand) throw new Error('Brand not found');

      if (brand.isActive === false) {
        return { message: 'Brand is already inactive' };
      }

      await brand.update({ isActive: false });
      return { message: 'Brand deactivated successfully' };
    } catch (error) {
      throw new Error(`Error deactivating brand: ${error.message}`);
    }
  }

  async activateBrand(id) {
    try {
      if (!id) throw new Error('Invalid id');

      // try normal lookup first
      let brand = await Brand.findByPk(id);

      // If not found, try paranoid:false if you use paranoid soft deletes
      if (!brand) {
        brand = await Brand.findByPk(id, { paranoid: false });
        if (!brand) throw new Error('Brand not found');
      }

      if (brand.isActive === true) {
        return { message: 'Brand is already active' };
      }

      await brand.update({ isActive: true });
      return { message: 'Brand activated successfully' };
    } catch (error) {
      throw new Error(`Error activating brand: ${error.message}`);
    }
  }
}

module.exports = new BrandService();