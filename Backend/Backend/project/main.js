const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

// Import models to ensure they are registered with Sequelize
const User = require('./models/User');
const Event = require('./models/Event');
const Attendee = require('./models/Attendee');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');

// Define API routes
app.use('/api/auth', authRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        // Sync all models
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Eventify API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 