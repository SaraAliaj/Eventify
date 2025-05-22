const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  console.log('Auth middleware called');
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token ? `${token.substring(0, 15)}...` : 'No token');
    
    if (!token) {
      console.log('No token provided, authorization denied');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    console.log('Verifying token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Token verified, user ID:', decoded.id);
    
    // Find user by id
    console.log('Finding user by ID:', decoded.id);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User found:', user.id, 'Role:', user.role);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

module.exports = auth; 