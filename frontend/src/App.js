import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import { Box, Typography } from '@mui/material';

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
    // ...rest of the shadows array
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

// Protected Route for authenticated users
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, not authenticated');
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Parse user data from localStorage
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          console.log('No user data found, not authenticated');
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        console.log('User data loaded:', user);
        
        if (user && user.role) {
          console.log('User authenticated with role:', user.role);
          setIsAuthenticated(true);
          setUserRole(user.role);
        } else {
          console.log('User data incomplete, not authenticated');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6">Duke u ngarkuar...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    console.log(`Role mismatch: required=${requiredRole}, user has=${userRole}`);
    
    // Redirect regular users trying to access admin pages to dashboard
    if (requiredRole === 'admin') {
      console.log('Regular user trying to access admin page, redirecting to dashboard');
      return <Navigate to="/dashboard" />;
    }
    
    // Redirect admins to admin panel if they try to access user dashboard
    console.log('Admin trying to access user page, redirecting to admin');
    return <Navigate to="/admin" />;
  }

  console.log(`Access granted for role=${userRole}`);
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 