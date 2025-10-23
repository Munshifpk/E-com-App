const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products/list', { products });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('products/detail', { product });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, price, category, description, image } = req.body;
    try {
        const newProduct = new Product({ name, price, category, description, image });
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, price, category, description, image } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, price, category, description, image }, { new: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect(`/products/${req.params.id}`);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};