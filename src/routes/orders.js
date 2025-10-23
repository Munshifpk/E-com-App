const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

// console.log('Order controller loaded:', orderController);

// Create a new order
router.post('/', isAuthenticated, orderController.createOrder);

// Get all orders for the logged-in user
router.get('/', isAuthenticated, orderController.getUserOrders);

// Get a specific order by ID
router.get('/:orderId', isAuthenticated, orderController.getOrderById);

// Update order status (admin only)
router.put('/:orderId', isAuthenticated, orderController.updateOrderStatus);

// Delete an order (admin only)
router.delete('/:orderId', isAuthenticated, orderController.deleteOrder);

module.exports = router;
