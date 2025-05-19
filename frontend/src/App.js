import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 