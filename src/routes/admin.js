const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/auth');

console.log('Admin controller:', adminController);


// Admin Dashboard
router.get('/dashboard', isAdmin, adminController.dashboard);

// Manage Products 
router.get('/manage-products', isAdmin, adminController.manageProducts);
router.post('/manage-products', isAdmin, adminController.addProduct);
router.put('/manage-products/:id', isAdmin, adminController.updateProduct);
router.get('/manage-products/edit/:id', isAdmin, adminController.editProduct);
router.delete('/manage-products/:id', isAdmin, adminController.deleteProduct);

// View Orders
router.get('/orders', isAdmin, adminController.viewOrders);

module.exports = router;