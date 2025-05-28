import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Calendar from './pages/Calendar';
import Attendees from './pages/Attendees';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// Create a theme with Naval blue primary color from the color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#13294B', // Naval blue (SW6244)
      light: '#A0AEC1', // Windy Blue (SW6240)
      dark: '#0c1c34',
    },
    secondary: {
      main: '#B5BCC4', // Upward (SW6239)
      light: '#D1C9B8', // Linwood Sands (HGSW 250e) 
      dark: '#9aa3ae',
    },
    background: {
      default: '#F2F2ED', // Alabaster (SW7008)
      paper: '#F2F2ED',
    },
    text: {
      primary: '#13294B',
      secondary: '#5a6987',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '1px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(19, 41, 75, 0.05)',
    '0px 4px 8px rgba(19, 41, 75, 0.08)',
    '0px 8px 16px rgba(19, 41, 75, 0.1)',
    '0px 12px 24px rgba(19, 41, 75, 0.12)',
    '0px 14px 28px rgba(19, 41, 75, 0.14)',
    '0px 16px 32px rgba(19, 41, 75, 0.16)',
    '0px 18px 36px rgba(19, 41, 75, 0.18)',
    '0px 20px 40px rgba(19, 41, 75, 0.2)',
    '0px 22px 44px rgba(19, 41, 75, 0.22)',
    '0px 24px 48px rgba(19, 41, 75, 0.24)',
    '0px 26px 52px rgba(19, 41, 75, 0.26)',
    '0px 28px 56px rgba(19, 41, 75, 0.28)',
    '0px 30px 60px rgba(19, 41, 75, 0.3)',
    '0px 32px 64px rgba(19, 41, 75, 0.32)',
    '0px 34px 68px rgba(19, 41, 75, 0.34)',
    '0px 36px 72px rgba(19, 41, 75, 0.36)',
    '0px 38px 76px rgba(19, 41, 75, 0.38)',
    '0px 40px 80px rgba(19, 41, 75, 0.4)',
    '0px 42px 84px rgba(19, 41, 75, 0.42)',
    '0px 44px 88px rgba(19, 41, 75, 0.44)',
    '0px 46px 92px rgba(19, 41, 75, 0.46)',
    '0px 48px 96px rgba(19, 41, 75, 0.48)',
    '0px 50px 100px rgba(19, 41, 75, 0.5)',
    '0px 52px 104px rgba(19, 41, 75, 0.52)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Simplified Protected Route using AuthContext
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, checkRole, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !checkRole(requiredRole)) {
    return <Navigate to={checkRole('admin') ? '/admin' : '/dashboard'} />;
  }

  return children;
};

// Wrap the main app content
const AppContent = () => {
  return (
    <Routes>
      {/* Public routes - No sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Protected routes with Layout and Sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="attendees" element={<Attendees />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Admin route */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect authenticated users to dashboard, others to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div className="app">
            <AppContent />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App; 