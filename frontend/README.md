# Eventify Frontend

The frontend application for Eventify, built with React and Material-UI.

## 🛠️ Tech Stack

- React.js
- Material-UI (MUI)
- React Router DOM
- Axios
- Date-fns

## 📁 Directory Structure

```
frontend/
├── public/          # Static files and assets
├── src/            # Source code
│   ├── components/ # React components
│   ├── pages/      # Page components
│   ├── services/   # API services
│   ├── utils/      # Utility functions
│   ├── App.js      # Root component
│   └── index.js    # Entry point
└── package.json    # Dependencies and scripts
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## 🔗 Environment Variables

Create a `.env` file in the frontend root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 📚 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App 