import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Container, Alert, Fade } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const result = await login(formData);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Ndodhi një gabim gjatë hyrjes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
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
            Hyrje
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 2,
                    mb: 2,
                    height: '48px'
                  }}
                >
                  {loading ? 'Duke u kyçur...' : 'Kyçu'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Typography variant="body2">
                Nuk keni llogari?{' '}
                <Link to="/register" style={{ color: 'primary.main', textDecoration: 'none' }}>
                  Regjistrohu
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default Login; 