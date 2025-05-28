const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

console.log('Starting Eventify Backend Server...');

// Import models to ensure they are registered with Sequelize
const Event = require('./models/Event');
const Attendee = require('./models/Attendee');

const app = express();

// Middleware
// Configure CORS with specific options
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
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
const attendeeRoutes = require('./routes/attendees');

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);

console.log('Routes registered: /api/auth, /api/admin, /api/events, /api/attendees');

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

// Test database connection and sync models
const initializeDatabase = async () => {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');

        // IMPORTANT: Changed from force: true to force: false to preserve data
        // force: false means it will NOT drop existing tables and data
        await sequelize.sync({ force: false });
        console.log('💾 Database synchronized successfully - DATA PRESERVED');

        // Create initial admin user if needed (only if doesn't exist)
        const adminUser = {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@eventify.com',
            password: await bcrypt.hash('admin123', 10),
            role: 'admin'
        };

        const [user, created] = await User.findOrCreate({
            where: { email: adminUser.email },
            defaults: adminUser
        });

        if (created) {
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists - data persistence working!');
        }

    } catch (error) {
        console.error('Unable to initialize database:', error);
        process.exit(1);
    }
};

// Define model associations after all models are loaded
const setupAssociations = () => {
  // User associations
  User.hasMany(Event, {
    foreignKey: 'userId',
    as: 'events'
  });
  
  Event.belongsTo(User, {
    foreignKey: 'userId',
    as: 'organizer'
  });
  
  // Event-Attendee associations
  Event.hasMany(Attendee, {
    foreignKey: 'eventId',
    as: 'attendees'
  });
  
  Attendee.belongsTo(Event, {
    foreignKey: 'eventId',
    as: 'event'
  });
  
  console.log('✅ Model associations established successfully');
};

// Call setup associations
setupAssociations();

// Initialize database and start server
const startServer = async () => {
    try {
        await initializeDatabase();
        
        // First, check if port is in use
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📡 API available at http://localhost:${PORT}/api`);
            console.log(`🔒 Data persistence: ENABLED - Your data will be saved!`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
                process.exit(1);
            } else {
                console.error('Server error:', error);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 