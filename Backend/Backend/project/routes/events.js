const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all events for the logged-in user
router.get('/', auth, async (req, res) => {
  console.log('Get events request for user ID:', req.user.id);
  
  try {
    // Find all events created by the user
    const events = await Event.findAll({
      where: { userId: req.user.id },
      order: [['startDate', 'ASC']]
    });
    
    console.log(`Found ${events.length} events for user ${req.user.id}`);
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Get a specific event by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id // Ensure the user owns this event
      }
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Eventi nuk u gjet' });
    }
    
    console.log('Event found:', event.id);
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Create a new event
router.post('/', auth, async (req, res) => {
  console.log('Create event request received:', req.body);
  
  try {
    const { title, description, location, startDate, endDate, category, capacity } = req.body;
    
    // Basic validation
    if (!title || !startDate) {
      console.log('Event creation failed: Missing required fields');
      return res.status(400).json({ message: 'Titulli dhe data janë të detyrueshëm' });
    }
    
    // Create the event
    const newEvent = await Event.create({
      title,
      description,
      location,
      startDate,
      endDate,
      category,
      capacity,
      userId: req.user.id // Associate with the logged-in user
    });
    
    console.log('Event created successfully:', newEvent.id);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Update an existing event
router.put('/:id', auth, async (req, res) => {
  console.log('Update event request received for ID:', req.params.id);
  
  try {
    // Find the event first to ensure it belongs to the user
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Eventi nuk u gjet ose nuk keni të drejta për ta ndryshuar' });
    }
    
    // Update the event
    const { title, description, location, startDate, endDate, category, capacity } = req.body;
    
    const updatedEvent = await event.update({
      title: title || event.title,
      description: description !== undefined ? description : event.description,
      location: location || event.location,
      startDate: startDate || event.startDate,
      endDate: endDate !== undefined ? endDate : event.endDate,
      category: category !== undefined ? category : event.category,
      capacity: capacity !== undefined ? capacity : event.capacity
    });
    
    console.log('Event updated successfully:', updatedEvent.id);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
  console.log('Delete event request received for ID:', req.params.id);
  
  try {
    // Find the event first to ensure it belongs to the user
    const event = await Event.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Eventi nuk u gjet ose nuk keni të drejta për ta fshirë' });
    }
    
    // Delete the event
    await event.destroy();
    
    console.log('Event deleted successfully:', req.params.id);
    res.json({ message: 'Eventi u fshi me sukses' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

module.exports = router; 