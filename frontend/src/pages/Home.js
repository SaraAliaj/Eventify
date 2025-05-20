import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container, Fade, Zoom, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import './Home.css';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Animation states
  const [loaded, setLoaded] = React.useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar - Centered with logo */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        background: 'white',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Fade in={loaded} timeout={800}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 2,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }
            }}>
              <EventIcon sx={{ color: '#4355B9', fontSize: 36, mr: 1 }} />
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{ 
                  color: '#4355B9', 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  letterSpacing: '1px'
                }}
              >
                Eventify
              </Typography>
            </Box>
          </Fade>
        </Box>
        
        <Box sx={{ display: 'flex' }}>
          <Fade in={loaded} timeout={1000}>
            <Button component={Link} to="/" sx={{ 
              color: '#13294B', 
              fontWeight: 'bold', 
              mx: 1,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '0',
                height: '2px',
                bottom: 0,
                left: '50%',
                backgroundColor: '#4355B9',
                transition: 'all 0.3s ease',
              },
              '&:hover:after': {
                width: '100%',
                left: 0,
              }
            }}>
              KRYEFAQJA
            </Button>
          </Fade>
          
          <Fade in={loaded} timeout={1200}>
            <Button component={Link} to="/about" sx={{ 
              color: '#13294B', 
              fontWeight: 'bold', 
              mx: 1,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '0',
                height: '2px',
                bottom: 0,
                left: '50%',
                backgroundColor: '#4355B9',
                transition: 'all 0.3s ease',
              },
              '&:hover:after': {
                width: '100%',
                left: 0,
              }
            }}>
              RRETH NESH
            </Button>
          </Fade>
          
          <Fade in={loaded} timeout={1400}>
            <Button component={Link} to="/contact" sx={{ 
              color: '#13294B', 
              fontWeight: 'bold', 
              mx: 1,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '0',
                height: '2px',
                bottom: 0,
                left: '50%',
                backgroundColor: '#4355B9',
                transition: 'all 0.3s ease',
              },
              '&:hover:after': {
                width: '100%',
                left: 0,
              }
            }}>
              KONTAKT
            </Button>
          </Fade>
        </Box>
      </Box>

      {/* Main Content with animations */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f2f2ed 60%, #e3e6f3 100%)',
        padding: '2rem',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background decorations */}
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
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Main Logo - Centered and Eye-catching */}
          <Zoom in={loaded} timeout={800}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 4,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.8s ease'
            }}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4355B9 0%, #13294B 100%)',
                boxShadow: '0 10px 30px rgba(19, 41, 75, 0.3)',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 35px rgba(19, 41, 75, 0.4)'
                }
              }}>
                <EventIcon sx={{ fontSize: 50, color: 'white' }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mt: 1
                  }}
                >
                  Eventify
                </Typography>
              </Box>
            </Box>
          </Zoom>

          {/* Main Heading with animation */}
          <Fade in={loaded} timeout={1200}>
            <Typography 
              variant="h2" 
              component="h1" 
              className="animated-text"
              sx={{ 
                fontWeight: 'bold', 
                color: '#13294B',
                marginBottom: '1rem',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #13294B, #4355B9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
            >
              Eventify - Bën çdo rast special
            </Typography>
          </Fade>

          {/* Subheading with animation */}
          <Fade in={loaded} timeout={1400}>
            <Typography 
              variant="h6" 
              sx={{ 
                marginBottom: '2rem',
                color: '#13294B',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
            >
              Planifiko, fto dhe festoni me lehtësi.
            </Typography>
          </Fade>

          {/* Action Buttons with animations */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            marginBottom: '3rem',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Zoom in={loaded} timeout={1600}>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                className="pulse-button"
                sx={{ 
                  bgcolor: '#13294B', 
                  color: 'white',
                  padding: '0.7rem 2.5rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(19, 41, 75, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    bgcolor: '#212f54',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 7px 20px rgba(19, 41, 75, 0.4)'
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '30px',
                    border: '2px solid #13294B',
                    animation: 'pulse 2s infinite'
                  }
                }}
              >
                REGJISTROHU
              </Button>
            </Zoom>
            
            <Zoom in={loaded} timeout={1800}>
              <Button 
                component={Link} 
                to="/login" 
                variant="outlined" 
                sx={{ 
                  borderColor: '#13294B',
                  color: '#13294B',
                  padding: '0.7rem 2.5rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(19, 41, 75, 0.05)',
                    borderColor: '#13294B',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 5px 15px rgba(19, 41, 75, 0.1)'
                  }
                }}
              >
                HYRJE
              </Button>
            </Zoom>
          </Box>

          {/* Feature Cards with staggered animations */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <Zoom in={loaded} timeout={2000}>
              <Paper 
                elevation={2}
                className="feature-card" 
                sx={{ 
                  padding: '1.8rem', 
                  width: '220px', 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid #4355B9',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px rgba(67, 85, 185, 0.2)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: '0.8rem', color: '#13294B' }}>
                  Planifiko Evente
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Krijo dhe organizo evente me lehtësi
                </Typography>
              </Paper>
            </Zoom>
            
            <Zoom in={loaded} timeout={2200}>
              <Paper 
                elevation={2}
                className="feature-card" 
                sx={{ 
                  padding: '1.8rem', 
                  width: '220px', 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid #13294B',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px rgba(19, 41, 75, 0.2)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: '0.8rem', color: '#13294B' }}>
                  Dërgo Ftesa
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Fto të ftuarit me shabllone të bukura
                </Typography>
              </Paper>
            </Zoom>
            
            <Zoom in={loaded} timeout={2400}>
              <Paper 
                elevation={2}
                className="feature-card" 
                sx={{ 
                  padding: '1.8rem', 
                  width: '220px', 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid #6371C3',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px rgba(99, 113, 195, 0.2)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: '0.8rem', color: '#13294B' }}>
                  Festoni
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Shijoni rastet tuaja të veçanta
                </Typography>
              </Paper>
            </Zoom>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 