# Eventify Backend

The backend server for Eventify, built with Node.js, Express, and Sequelize.

## 🛠️ Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL/PostgreSQL
- JWT Authentication
- bcryptjs

## 📁 Directory Structure

```
Backend/
└── Backend/
    ├── project/           # Main source code
    │   ├── config/       # Database and other configurations
    │   ├── models/       # Sequelize models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   └── main.js       # Entry point
    ├── package.json      # Dependencies and scripts
    └── README.md         # Documentation
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the backend root directory:
```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Admin
- `GET /api/admin/users` - List all users
- `POST /api/admin/events` - Create event as admin
- `PUT /api/admin/users/:id` - Update user role

## 🔗 Database Models

### User
- firstName
- lastName
- email
- password
- role

### Event
- title
- description
- date
- location
- capacity
- userId (organizer)

### Attendee
- userId
- eventId
- status 