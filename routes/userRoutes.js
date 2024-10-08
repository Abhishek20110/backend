// backend/routes/userRoutes.js

import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating user. Please try again.',
            error: error.message
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords (no encryption)
        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            redirectTo: '/' // or any other route you want to redirect to
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in. Please try again.',
            error: error.message
        });
    }
});

export default router;
