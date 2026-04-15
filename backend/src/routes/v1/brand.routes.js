// ✅ CORRECT - Using Express Router
const express = require('express');
const router = express.Router(); // This is crucial!
const brandController = require('../../controllers/brand.controller');
const validate = require('../../middlewares/validate');
const { createBrandValidator, updateBrandValidator, brandIdValidator } = require('../../validators/brand.validators');

router.post('/', validate(createBrandValidator), brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.get('/:id', validate(brandIdValidator, 'params'), brandController.getBrandById);
router.put('/:id', validate(brandIdValidator, 'params'), validate(updateBrandValidator), brandController.updateBrand);
router.delete('/:id', validate(brandIdValidator, 'params'), brandController.deleteBrand);
router.patch('/:id/deactivate', validate(brandIdValidator, 'params'), brandController.deactivateBrand);
router.patch('/:id/activate', validate(brandIdValidator, 'params'), brandController.activateBrand);

module.exports = router; // This exports the router