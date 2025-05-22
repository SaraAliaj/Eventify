const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Test route to verify API is working
router.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Auth API is working correctly' });
});

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);
  
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Registration failed: User already exists with email', email);
      return res.status(400).json({ message: 'Përdoruesi me këtë email tashmë ekziston' });
    }

    // Generate username from email if not provided
    const username = email.split('@')[0];
    console.log('Generated username:', username);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user (default role is 'user')
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: role || 'user' // Only set role if provided, otherwise default to 'user'
    });

    console.log('User created successfully:', user.id);

    // Create token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    console.log('Sending registration response:', { token: 'JWT_TOKEN', user: userData });

    res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log('Login failed: Missing required fields');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Login failed: User not found with email', email);
      return res.status(400).json({ message: 'Email ose fjalëkalim i pavlefshëm' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for user', email);
      return res.status(400).json({ message: 'Email ose fjalëkalim i pavlefshëm' });
    }

    console.log('User authenticated successfully:', user.id);

    // Create token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    console.log('Sending login response:', { token: 'JWT_TOKEN', user: userData });

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  console.log('Get current user request for user ID:', req.user.id);
  
  try {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

module.exports = router; 