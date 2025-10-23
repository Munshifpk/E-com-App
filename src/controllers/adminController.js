const Product = require('../models/product');
const Order = require('../models/order');

// Render admin dashboard
exports.dashboard = (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
};

// Manage products
exports.manageProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/manage-products', { title: 'Manage Products', products });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Add new product
exports.addProduct = async (req, res) => {
    const { name, price, category, description, image } = req.body;
    const newProduct = new Product({ name, price, category, description, image });

    try {
        await newProduct.save();
        res.redirect('/admin/manage-products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Edit product
exports.editProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.render('admin/edit-product', { title: 'Edit Product', product });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, category, description, image } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { name, price, category, description, image });
        res.redirect('/admin/manage-products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.redirect('/admin/manage-products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// View user orders
exports.viewOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.render('admin/view-orders', { title: 'User Orders', orders });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};