const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const User = require('../models/User');

async function createAdminUser() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Admin user details
    const adminUser = {
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@eventify.com',
      password: 'admin123', // This will be hashed
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      where: { email: adminUser.email } 
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Create admin user
    const newAdmin = await User.create({
      ...adminUser,
      password: hashedPassword
    });

    console.log('Admin user created successfully:', {
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Close database connection
    await sequelize.close();
  }
}

// Run the function
createAdminUser(); 