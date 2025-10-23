const mongoose = require('mongoose');
const Product = require('../src/models/product');
const User = require('../src/models/user');
const Order = require('../src/models/order');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});

        // Seed Users
        const users = await User.insertMany([
            { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
            { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'admin' },
        ]);

        // Seed Products
        const products = await Product.insertMany([
            { name: 'Product 1', price: 29.99, category: 'Category 1', description: 'Description for product 1', image: 'uploads/product1.jpg' },
            { name: 'Product 2', price: 49.99, category: 'Category 2', description: 'Description for product 2', image: 'uploads/product2.jpg' },
        ]);

        // Seed Orders
        await Order.insertMany([
            { userId: users[0]._id, products: [products[0]._id], totalAmount: 29.99, status: 'Pending' },
            { userId: users[1]._id, products: [products[1]._id], totalAmount: 49.99, status: 'Completed' },
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();