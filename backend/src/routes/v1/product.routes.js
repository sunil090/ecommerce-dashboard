const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const validate = require('../../middlewares/validate');
const { createProductValidator, updateProductValidator, productIdValidator } = require('../../validators/product.validators');

router.post('/', validate(createProductValidator), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validate(productIdValidator, 'params'), productController.getProductById);
router.put('/:id', validate(productIdValidator, 'params'), validate(updateProductValidator), productController.updateProduct);
router.delete('/:id', validate(productIdValidator, 'params'), productController.deleteProduct);
router.patch('/:id/activate', validate(productIdValidator, 'params'), productController.activateProduct);

router.patch('/:id/deactivate', validate(productIdValidator, 'params'), productController.deactivateProduct);
// router.get('/brand/:brandId', productController.getProductsByBrand);
// router.get('/category/:categoryId', productController.getProductsByCategory);

module.exports = router;