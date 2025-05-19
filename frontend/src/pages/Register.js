import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Container, Alert } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { authService } from '../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // In a real application, this would call the API
      // For now we'll just simulate a successful registration
      console.log('Attempting registration with:', formData);
      
      // Uncomment this when your backend is ready
      /*
      const response = await authService.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      */
      
      // For demonstration purposes
      setTimeout(() => {
        localStorage.setItem('token', 'sample-token');
        localStorage.setItem('user', JSON.stringify({ 
          id: 1, 
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email 
        }));
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Ndodhi një gabim gjatë regjistrimit');
      setLoading(false);
    }
  };

  return (
    <Grid container className="register-container">
      <Grid item xs={12} md={5} lg={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Box className="content-container">
          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Eventify
              </Typography>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Krijo një llogari
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="Emri"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="Mbiemri"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Fjalëkalimi"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, py: 1.5 }}
                    disabled={loading}
                  >
                    {loading ? 'Duke krijuar llogarinë...' : 'Krijo Llogari'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Keni tashmë një llogari? <Link to="/login" style={{ color: '#3f51b5', textDecoration: 'none' }}>Hyrje</Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register; 