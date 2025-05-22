const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

console.log('Starting Eventify Backend Server...');

// Import models to ensure they are registered with Sequelize
const User = require('./models/User');
const Event = require('./models/Event');
const Attendee = require('./models/Attendee');

const app = express();

// Middleware
// Configure CORS with specific options
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
console.log('CORS configured with options:', corsOptions);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/events');

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

console.log('Routes registered: /api/auth, /api/admin, /api/events');

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

// 404 handler
app.use((req, res, next) => {
    console.log(`404 - Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
}); 