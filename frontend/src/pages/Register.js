import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Container, Alert, Fade } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Fjalëkalimet nuk përputhen');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Fjalëkalimi duhet të jetë të paktën 6 karaktere');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'user' // Default role for new registrations
      });

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Ndodhi një gabim gjatë regjistrimit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className="register-container">
      <Fade in={loaded} timeout={1200}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Regjistrohu
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  label="Konfirmo Fjalëkalimin"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Duke u regjistruar...' : 'Regjistrohu'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                Keni një llogari?{' '}
                <Link to="/login" style={{ color: 'primary.main', textDecoration: 'none' }}>
                  Kyçu
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default Register; 