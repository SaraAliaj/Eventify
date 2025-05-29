# Eventify

A full-stack event management application built with React and Node.js.

## 📁 Project Structure

```
EventifyProject/
├── frontend/               # React frontend application
│   ├── public/            # Static files
│   ├── src/               # Source files
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
│
├── Backend/               # Node.js backend application
│   └── Backend/
│       ├── project/       # Main backend source code
│       │   ├── config/    # Configuration files
│       │   ├── models/    # Database models
│       │   ├── routes/    # API routes
│       │   └── main.js    # Entry point
│       ├── package.json   # Backend dependencies
│       └── README.md      # Backend documentation
│
├── render.yaml            # Render deployment configuration
├── run-all.bat           # Script to run both frontend and backend
├── start-frontend.bat    # Script to start frontend
├── start-backend.bat     # Script to start backend
└── README.md             # Main documentation
```

## 🚀 Deployment Guide

This guide explains how to deploy Eventify on Render.com.

## Prerequisites

1. A Render account (https://render.com)
2. A MySQL database (You can use Render's PostgreSQL or external MySQL service)
3. Your project code pushed to a Git repository

## Deployment Steps

### 1. Database Setup

1. Set up your production database
2. Note down the database connection URL

### 2. Frontend Deployment

1. In Render dashboard, go to "New +" and select "Static Site"
2. Connect your repository
3. Configure the following:
   - Name: `eventify-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Add environment variables:
   - `NODE_ENV`: `production`
   - `REACT_APP_API_URL`: Your backend URL (after backend deployment)

### 3. Backend Deployment

1. In Render dashboard, go to "New +" and select "Web Service"
2. Connect your repository
3. Configure the following:
   - Name: `eventify-backend`
   - Environment: `Node`
   - Build Command: `cd Backend/Backend && npm install`
   - Start Command: `cd Backend/Backend && node project/main.js`
4. Add environment variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your database connection URL
   - `JWT_SECRET`: A secure random string (Render can generate this)
   - Any other environment variables your app needs

### 4. Final Steps

1. After both services are deployed, copy the backend URL
2. Update the frontend's `REACT_APP_API_URL` environment variable with the backend URL
3. Trigger a new frontend deployment

## Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend service URL

### Backend
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"
- Add any other required environment variables

## Health Checks

The backend includes a health check endpoint at `/api/health` that Render uses to monitor the service status.

## Troubleshooting

1. If the frontend can't connect to the backend:
   - Verify the `REACT_APP_API_URL` is correct
   - Check CORS settings in the backend
   - Ensure the backend service is running

2. If the backend fails to start:
   - Check the logs in Render dashboard
   - Verify all environment variables are set correctly
   - Ensure the database connection is working

3. For database connection issues:
   - Verify the DATABASE_URL is correct
   - Check if the database is accessible from Render's IP range
   - Ensure the database user has the correct permissions

## Support

For additional help:
- Render Documentation: https://render.com/docs
- Create an issue in the project repository
- Contact the development team 