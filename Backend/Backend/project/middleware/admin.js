const auth = require('./auth');

const admin = async (req, res, next) => {
  console.log('Admin middleware called');
  try {
    // First run the auth middleware to get the user
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) {
          console.error('Auth middleware error in admin middleware:', err);
          return reject(err);
        }
        resolve();
      });
    });

    console.log('Auth middleware passed, checking admin role for user:', req.user?.id);
    
    // Check if user has admin role
    if (req.user && req.user.role === 'admin') {
      console.log('User has admin role, granting access');
      next();
    } else {
      console.log('Access denied - user does not have admin role:', req.user?.role);
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = admin; 