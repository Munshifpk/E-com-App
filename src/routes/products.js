const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to list all products
router.get('/', productController.getAllProducts);

// Route to get details of a specific product
router.get('/:id', productController.getProductById);

// Route to create a new product (admin only)
router.post('/', productController.createProduct);

// Route to update an existing product (admin only)
router.put('/:id', productController.updateProduct);

// Route to delete a product (admin only)
router.delete('/:id', productController.deleteProduct);

module.exports = router;