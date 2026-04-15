const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const { createCategoryValidator, updateCategoryValidator, categoryIdValidator } = require('../../validators/category.validators');

router.post('/', validate(createCategoryValidator), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', validate(categoryIdValidator, 'params'), categoryController.getCategoryById);
router.put('/:id', validate(categoryIdValidator, 'params'), validate(updateCategoryValidator), categoryController.updateCategory);
router.delete('/:id', validate(categoryIdValidator, 'params'), categoryController.deleteCategory);
router.patch('/:id/activate', validate(categoryIdValidator, 'params'), categoryController.activateCategory);
router.patch('/:id/deactivate', validate(categoryIdValidator, 'params'), categoryController.deactivateCategory);

module.exports = router;
