const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided for admin route');
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get user from database
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      console.log('User not found for token:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      console.log('Non-admin user attempted to access admin route:', user.id);
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 