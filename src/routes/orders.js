const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

console.log(orderController);
// Route to create a new order
router.post('/', isAuthenticated, orderController.createOrder);

// Route to get all orders for a user
router.get('/', isAuthenticated, orderController.getUserOrders);

// Route to get a specific order by ID
router.get('/:orderId', isAuthenticated, orderController.getOrderById);

// Route to update an order status (admin only)
router.put('/:orderId', isAuthenticated, orderController.updateOrderStatus);

// Route to delete an order (admin only)
router.delete('/:orderId', isAuthenticated, orderController.deleteOrder);

module.exports = router;