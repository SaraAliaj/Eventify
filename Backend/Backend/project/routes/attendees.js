const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all attendees for user's events
router.get('/', auth, async (req, res) => {
  console.log('Get attendees request for user ID:', req.user.id);
  
  try {
    // Get all events for the user first
    const userEvents = await Event.findAll({
      where: { userId: req.user.id },
      attributes: ['id']
    });
    
    const eventIds = userEvents.map(event => event.id);
    
    // If user has no events, return empty array
    if (eventIds.length === 0) {
      console.log(`User ${req.user.id} has no events, returning empty attendees list`);
      return res.json([]);
    }
    
    // Get all attendees for user's events
    const attendees = await Attendee.findAll({
      where: { eventId: eventIds },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'startDate', 'location']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`Found ${attendees.length} attendees for user ${req.user.id}`);
    res.json(attendees);
  } catch (error) {
    console.error('Get attendees error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Get attendees for a specific event
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    // First verify the event belongs to the user
    const event = await Event.findOne({
      where: { 
        id: req.params.eventId,
        userId: req.user.id 
      }
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Eventi nuk u gjet ose nuk keni të drejta për ta parë' });
    }
    
    // Get attendees for this event
    const attendees = await Attendee.findAll({
      where: { eventId: req.params.eventId },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'startDate', 'location']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(attendees);
  } catch (error) {
    console.error('Get event attendees error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Add a new attendee to an event
router.post('/', auth, async (req, res) => {
  console.log('Add attendee request received:', req.body);
  console.log('User ID:', req.user.id);
  
  try {
    const { name, email, eventId, status = 'invited' } = req.body;
    
    // Basic validation
    if (!name || !email || !eventId) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ message: 'Emri, email-i dhe eventi janë të detyrueshëm' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format');
      return res.status(400).json({ message: 'Formati i email-it nuk është i saktë' });
    }

    // Validate status
    const validStatuses = ['invited', 'confirmed', 'declined', 'maybe'];
    if (!validStatuses.includes(status)) {
      console.log('Validation failed - invalid status');
      return res.status(400).json({ message: 'Statusi i zgjedhur nuk është i vlefshëm' });
    }
    
    console.log(`Looking for event with ID: ${eventId} for user: ${req.user.id}`);
    
    // Verify the event belongs to the user
    const event = await Event.findOne({
      where: { 
        id: eventId,
        userId: req.user.id 
      }
    });
    
    if (!event) {
      console.log(`Event not found or access denied. Event ID: ${eventId}, User ID: ${req.user.id}`);
      return res.status(404).json({ message: 'Eventi nuk u gjet ose nuk keni të drejta për të shtuar pjesëmarrës' });
    }
    
    console.log(`Event found: ${event.title}`);
    
    // Check if attendee already exists for this event
    const existingAttendee = await Attendee.findOne({
      where: { 
        email: email,
        eventId: eventId 
      }
    });
    
    if (existingAttendee) {
      console.log(`Attendee already exists: ${email} for event ${eventId}`);
      return res.status(400).json({ message: 'Ky pjesëmarrës është regjistruar tashmë për këtë event' });
    }
    
    console.log('Creating new attendee...');
    
    // Create the attendee
    const newAttendee = await Attendee.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      eventId: parseInt(eventId),
      status
    });
    
    console.log('Attendee created with ID:', newAttendee.id);
    
    // Fetch the complete attendee with event details
    const attendeeWithEvent = await Attendee.findByPk(newAttendee.id, {
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'startDate', 'location']
      }]
    });
    
    console.log('Attendee created successfully:', attendeeWithEvent);
    res.status(201).json(attendeeWithEvent);
  } catch (error) {
    console.error('Create attendee error details:', {
      message: error.message,
      stack: error.stack,
      sql: error.sql,
      original: error.original
    });
    
    // Handle specific database errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Të dhënat e futura nuk janë të sakta', 
        details: error.errors.map(e => e.message)
      });
    }
    
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'Eventi i zgjedhur nuk ekziston' });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Ky pjesëmarrës është regjistruar tashmë' });
    }
    
    res.status(500).json({ 
      message: 'Gabim në server gjatë ruajtjes së të dhënave', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update attendee status
router.put('/:id', auth, async (req, res) => {
  console.log('Update attendee request received for ID:', req.params.id);
  
  try {
    // Find the attendee and verify the event belongs to the user
    const attendee = await Attendee.findByPk(req.params.id, {
      include: [{
        model: Event,
        as: 'event',
        where: { userId: req.user.id }
      }]
    });
    
    if (!attendee) {
      return res.status(404).json({ message: 'Pjesëmarrësi nuk u gjet ose nuk keni të drejta për ta ndryshuar' });
    }
    
    // Update the attendee
    const { name, email, status } = req.body;
    
    const updatedAttendee = await attendee.update({
      name: name || attendee.name,
      email: email || attendee.email,
      status: status || attendee.status
    });
    
    // Fetch the complete updated attendee with event details
    const attendeeWithEvent = await Attendee.findByPk(updatedAttendee.id, {
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'startDate', 'location']
      }]
    });
    
    console.log('Attendee updated successfully:', updatedAttendee.id);
    res.json(attendeeWithEvent);
  } catch (error) {
    console.error('Update attendee error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

// Delete an attendee
router.delete('/:id', auth, async (req, res) => {
  console.log('Delete attendee request received for ID:', req.params.id);
  
  try {
    // Find the attendee and verify the event belongs to the user
    const attendee = await Attendee.findByPk(req.params.id, {
      include: [{
        model: Event,
        as: 'event',
        where: { userId: req.user.id }
      }]
    });
    
    if (!attendee) {
      return res.status(404).json({ message: 'Pjesëmarrësi nuk u gjet ose nuk keni të drejta për ta fshirë' });
    }
    
    // Delete the attendee
    await attendee.destroy();
    
    console.log('Attendee deleted successfully:', req.params.id);
    res.json({ message: 'Pjesëmarrësi u fshi me sukses' });
  } catch (error) {
    console.error('Delete attendee error:', error);
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
});

module.exports = router; 