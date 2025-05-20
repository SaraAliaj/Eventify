import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  TextField,
  IconButton,
  InputAdornment,
  Fade,
  Zoom,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Animation states
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically call an API to subscribe the email
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar - Same as Home page */}
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
            <Box 
              component={Link} 
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 2,
                textDecoration: 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <EventIcon sx={{ color: '#4355B9', fontSize: 36, mr: 1 }} />
              <Typography
                variant="h5"
                sx={{ 
                  color: '#4355B9', 
                  fontWeight: 'bold',
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
                width: '100%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: '#4355B9',
              },
            }}>
              KONTAKT
            </Button>
          </Fade>
        </Box>
      </Box>

      {/* Main Content with animations */}
      <Box sx={{ 
        flex: 1, 
        background: 'linear-gradient(120deg, #f2f2ed 60%, #e3e6f3 100%)',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        position: 'relative',
        overflow: 'hidden'
      }}>
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 6 }}>
          {/* Page Title */}
          <Fade in={loaded} timeout={800}>
            <Typography 
              variant="h2" 
              component="h1" 
              align="center"
              sx={{ 
                fontWeight: 'bold', 
                mb: 6,
                color: '#13294B',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Na Kontaktoni
            </Typography>
          </Fade>
          
          {/* Contact Information */}
          <Grid container spacing={4} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1000}>
                <Paper elevation={3} sx={{
                  p: 4,
                  borderRadius: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#13294B' }}>
                    Informacion Kontakti
                  </Typography>
                  
                  <List>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <EmailIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Email:
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            component="a" 
                            href="mailto:info@eventify.al" 
                            sx={{ 
                              color: '#13294B', 
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            info@eventify.al
                          </Typography>
                        }
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <PhoneIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Telefon:
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            component="a" 
                            href="tel:+355691234567" 
                            sx={{ 
                              color: '#13294B', 
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            +355 69 123 4567
                          </Typography>
                        }
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <LocationOnIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Adresa:
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: '#13294B' }}>
                            Rruga "Myslym Shyri", Tiranë, Shqipëri
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Zoom>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1200}>
                <Paper elevation={3} sx={{
                  p: 4,
                  borderRadius: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#13294B' }}>
                    Orari i Punës
                  </Typography>
                  
                  <List>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <AccessTimeIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            E Hënë - E Premte:
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: '#13294B' }}>
                            09:00 - 18:00
                          </Typography>
                        }
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <AccessTimeIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            E Shtunë:
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: '#13294B' }}>
                            10:00 - 15:00
                          </Typography>
                        }
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <AccessTimeIcon sx={{ color: '#4355B9', fontSize: 28 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            E Dielë:
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: '#13294B' }}>
                            Mbyllur
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
          
          {/* Social Media & Newsletter */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1400}>
                <Paper elevation={3} sx={{
                  p: 4,
                  borderRadius: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#13294B' }}>
                    Na Ndiqni
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button 
                        fullWidth
                        variant="contained" 
                        size="large"
                        startIcon={<FacebookIcon />}
                        sx={{ 
                          py: 1.5, 
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          bgcolor: '#4267B2',
                          '&:hover': { bgcolor: '#365899' }
                        }}
                      >
                        Facebook
                      </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        fullWidth
                        variant="contained" 
                        size="large"
                        startIcon={<TwitterIcon />}
                        sx={{ 
                          py: 1.5, 
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          bgcolor: '#1DA1F2',
                          '&:hover': { bgcolor: '#0c85d0' }
                        }}
                      >
                        Twitter
                      </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        fullWidth
                        variant="contained" 
                        size="large"
                        startIcon={<InstagramIcon />}
                        sx={{ 
                          py: 1.5, 
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                          '&:hover': { 
                            background: 'linear-gradient(45deg, #e78a2b 0%, #dd5d32 25%, #d01b36 50%, #bb1a5a 75%, #a5147a 100%)',
                          }
                        }}
                      >
                        Instagram
                      </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        fullWidth
                        variant="contained" 
                        size="large"
                        startIcon={<LinkedInIcon />}
                        sx={{ 
                          py: 1.5, 
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          bgcolor: '#0077B5',
                          '&:hover': { bgcolor: '#006396' }
                        }}
                      >
                        LinkedIn
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1600}>
                <Paper elevation={3} sx={{
                  p: 4,
                  borderRadius: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#13294B' }}>
                    Abonohu për Njoftime
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Abonohu për të marrë njoftime dhe informacione mbi eventet e ardhshme.
                  </Typography>
                  
                  <form onSubmit={handleEmailSubmit}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Email juaj"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              type="submit"
                              disabled={!email || submitted}
                              sx={{ 
                                bgcolor: '#4355B9', 
                                color: 'white',
                                '&:hover': { bgcolor: '#13294B' },
                                '&.Mui-disabled': { bgcolor: '#ccc' }
                              }}
                            >
                              {submitted ? (
                                <Typography variant="caption" sx={{ px: 1 }}>
                                  ✓
                                </Typography>
                              ) : (
                                <SendIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        bgcolor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#4355B9',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4355B9',
                          },
                        },
                      }}
                    />
                    
                    {submitted && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mt: 1, 
                          color: 'green',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        Faleminderit për abonimin!
                      </Typography>
                    )}
                    
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={!email || submitted}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        bgcolor: '#13294B',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#0c1c34' }
                      }}
                    >
                      {submitted ? 'Abonimi u krye!' : 'Abonohu'}
                    </Button>
                  </form>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact; 