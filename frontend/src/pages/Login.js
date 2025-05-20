import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Container, Alert, Fade } from '@mui/material';
import { authService } from '../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = React.useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

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
      console.log('Attempting login with:', formData);
      
      // Make the actual API call to login
      const response = await authService.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/dashboard');
      setLoading(false);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Ndodhi një gabim gjatë hyrjes');
      setLoading(false);
    }
  };

  return (
    <Grid container className="login-container" 
      sx={{ 
        position: 'relative',
        background: 'linear-gradient(120deg, #f2f2ed 60%, #e3e6f3 100%)',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        overflow: 'hidden',
        minHeight: '100vh'
      }}
    >
      {/* Animated background elements */}
      <Box className="floating-circle" sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(67, 85, 185, 0.1) 0%, rgba(67, 85, 185, 0) 70%)',
        top: '10%',
        left: '5%',
        animation: 'float 8s infinite ease-in-out'
      }} />
      
      <Box className="floating-circle" sx={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(19, 41, 75, 0.08) 0%, rgba(19, 41, 75, 0) 70%)',
        bottom: '15%',
        right: '10%',
        animation: 'float 12s infinite ease-in-out'
      }} />

      <Grid item xs={12} md={12} lg={12}>
        <Box className="content-container" sx={{ position: 'relative', zIndex: 2 }}>
          <Container maxWidth="sm">
            <Fade in={loaded} timeout={800}>
              <Box sx={{ textAlign: 'center', mb: 4, mt: 5 }}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#3f51b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Eventify
                </Typography>
              </Box>
            </Fade>
            
            <Fade in={loaded} timeout={1000}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(45deg, #13294B, #4355B9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Mirë se u kthyet
              </Typography>
            </Fade>
            
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            
            <Fade in={loaded} timeout={1200}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.8)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.95)',
                          }
                        }
                      }}
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
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.8)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.95)',
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Link to="/forgot-password" style={{ color: '#3f51b5', textDecoration: 'none' }}>
                      Keni harruar fjalëkalimin?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      className="pulse-button"
                      sx={{ 
                        mt: 2, 
                        py: 1.5, 
                        bgcolor: '#13294B',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#21386a',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 7px 20px rgba(19, 41, 75, 0.4)'
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Duke hyrë...' : 'Hyrje'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Fade>
            
            <Fade in={loaded} timeout={1400}>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Nuk keni një llogari? <Link to="/register" style={{ color: '#3f51b5', textDecoration: 'none' }}>Regjistrohu</Link>
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login; 