const { Category } = require('../models');

class CategoryService {
  async createCategory(categoryData) {
    try {
      const category = await Category.create(categoryData);
      return category;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async getAllCategories() {
    try {
      const categories = await Category.findAll({
        where: { isActive: true },
        order: [['name', 'ASC']]
      });
      return categories;
    } catch (error) {
      throw new Error(`Error retrieving categories: ${error.message}`);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new Error(`Error retrieving category: ${error.message}`);
    }
  }

  async updateCategory(id, updateData) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      
      await category.update(updateData);
      return category;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async deleteCategory(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      
      await category.destroy();
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
 async activateCategory(id) {
    try {
      if (!id) throw new Error('Invalid id');

      const cleanId = String(id).trim();

      // try normal lookup first
      let category = await Category.findByPk(cleanId);

      // if not found, check with paranoid:false (if model uses paranoid soft deletes)
      if (!category) {
        category = await Category.findByPk(cleanId, { paranoid: false });
        if (!category) throw new Error('Category not found');
      }

      if (category.isActive === true) {
        return { message: 'Category is already active' };
      }

      await category.update({ isActive: true });
      return { message: 'Category activated successfully' };
    } catch (error) {
      throw new Error(`Error activating category: ${error.message}`);
    }
  }
  async softDeleteCategory(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error('Category not found');
      }
      
      await category.update({ isActive: false });
      return { message: 'Category deactivated successfully' };
    } catch (error) {
      throw new Error(`Error deactivating category: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();