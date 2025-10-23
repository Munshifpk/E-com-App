const Order = require('../models/order');
const User = require('../models/user');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const userId = req.user._id;

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            status: 'Pending'
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Retrieve all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

// Retrieve a specific order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { Orderid } = req.params;
        const order = await Order.findById(Orderid);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error });
    }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

// Delete an order (admin only)
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
