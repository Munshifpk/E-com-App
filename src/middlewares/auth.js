const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // attach user object to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token', error });
    }
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
    // First, make sure the user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    // Check if user role is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    next(); // user is admin, continue
};