const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const User = require('../models/User');
const Event = require('../models/Event');
const Attendee = require('../models/Attendee');
const sequelize = require('../config/database');

// Test route to verify admin API is working
router.get('/test', (req, res) => {
  console.log('Admin API test route accessed');
  res.json({ message: 'Admin API is working correctly' });
});

// Get all users (admin only)
router.get('/users', admin, async (req, res) => {
  console.log('Admin requesting all users, admin user ID:', req.user?.id);
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Don't send passwords
    });
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (admin only)
router.put('/users/:id', admin, async (req, res) => {
  console.log('Admin updating user ID:', req.params.id);
  try {
    const { firstName, lastName, email, role } = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      role: role || user.role
    });
    
    console.log('User updated successfully:', userId);

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', admin, async (req, res) => {
  console.log('Admin deleting user ID:', req.params.id);
  try {
    const userId = req.params.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found for deletion:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    console.log('User deleted successfully:', userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all events with attendee counts (admin only)
router.get('/events', admin, async (req, res) => {
  console.log('Admin requesting all events, admin user ID:', req.user?.id);
  try {
    // Simplified query to isolate potential issues
    const events = await Event.findAll();
    console.log(`Found ${events.length} events`);
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update event (admin only)
router.put('/events/:id', admin, async (req, res) => {
  try {
    const { title, description, location, date, capacity, categoryId } = req.body;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.update({
      title: title || event.title,
      description: description || event.description,
      location: location || event.location,
      date: date || event.date,
      capacity: capacity || event.capacity,
      categoryId: categoryId || event.categoryId
    });

    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event (admin only)
router.delete('/events/:id', admin, async (req, res) => {
  try {
    const eventId = req.params.id;
    
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 