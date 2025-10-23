const User = require('../models/user');
const passport = require('passport');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Login a user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Authentication error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Login error' });
            }
            res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
};

// Logout a user
exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
};

// Get current user
exports.getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
};