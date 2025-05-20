import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Card,
  CardMedia,
  Fade,
  Zoom,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Using placeholder images from free stock sites
const officeImage1 = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
const officeImage2 = "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80";
const officeImage3 = "https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Animation states
  const [loaded, setLoaded] = React.useState(false);
  
  useEffect(() => {
    setLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
                width: '100%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: '#4355B9',
              },
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
          {/* Hero Section */}
          <Fade in={loaded} timeout={800}>
            <Typography 
              variant="h2" 
              component="h1" 
              align="center"
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                background: 'linear-gradient(45deg, #13294B, #4355B9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Rreth Eventify
            </Typography>
          </Fade>
          
          {/* Introduction Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1000}>
                <Box>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 2 }}>
                    Eventify është platforma moderne dhe gjithëpërfshirëse e dedikuar për bizneset që duan të organizojnë 
                    evente profesionale, të menaxhuara me efikasitet dhe të mbajnë një hap përpara në ndërtimin e përvojave domethënëse.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                    E krijuar me vizionin për të thjeshtuar çdo hap të procesit të organizimit të eventeve, 
                    Eventify u jep bizneseve mjetet për të krijuar, promovuar dhe analizuar evente – gjithçka në një vend të vetëm.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1200}>
                <Card elevation={6} sx={{ 
                  height: '100%', 
                  minHeight: 250,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 30px rgba(19, 41, 75, 0.2)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={officeImage1}
                    alt="Modern office space"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Zoom>
            </Grid>
          </Grid>
          
          {/* Our Goal Section */}
          <Fade in={loaded} timeout={1400}>
            <Paper elevation={3} sx={{ 
              p: 4, 
              mb: 6, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '5px', 
                height: '100%', 
                bgcolor: '#4355B9' 
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: 32, color: '#4355B9', mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ color: '#13294B', fontWeight: 'bold' }}>
                  🎯 Qëllimi ynë
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', ml: 6 }}>
                Të ndihmojmë bizneset të organizojnë evente me ndikim real – nga konferenca, seminare dhe lansime produktesh, 
                deri te ngjarjet e brendshme dhe networking – përmes teknologjisë së zgjuar dhe një përvoje intuitive.
              </Typography>
            </Paper>
          </Fade>
          
          {/* Features Section */}
          <Box sx={{ mb: 6 }}>
            <Fade in={loaded} timeout={1600}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#13294B',
                    mr: 2
                  }}>
                    <LightbulbIcon sx={{ color: 'white' }} />
                  </Box>
                  <Typography variant="h4" component="h2" sx={{ color: '#13294B', fontWeight: 'bold' }}>
                    🔧 Çfarë ofron Eventify?
                  </Typography>
                </Box>
              </Box>
            </Fade>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Fade in={loaded} timeout={1800}>
                  <List>
                    {[
                      'Krijimi i eventeve me disa klikime',
                      'Kalendar dinamik dhe i personalizueshëm',
                      'Menaxhimi i ftesave dhe pjesëmarrësve',
                      'Njoftime dhe rikujtime automatike'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ 
                        py: 1.5,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(8px)'
                        }
                      }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: '#4355B9' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{ 
                            fontWeight: 500,
                            fontSize: '1.1rem'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Fade>
              </Grid>
              <Grid item xs={12} md={6}>
                <Fade in={loaded} timeout={2000}>
                  <List>
                    {[
                      'Raporte dhe analitika të detajuara',
                      'Integrime me rrjete sociale, kalendarë Google/Outlook, Zoom etj.',
                      'Siguri dhe ruajtje e të dhënave sipas standardeve më të larta'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ 
                        py: 1.5,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(8px)'
                        }
                      }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: '#4355B9' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{ 
                            fontWeight: 500,
                            fontSize: '1.1rem'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Fade>
              </Grid>
            </Grid>
          </Box>
          
          {/* For Who Section with Image */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={2200}>
                <Card elevation={6} sx={{ 
                  height: '100%', 
                  minHeight: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 30px rgba(19, 41, 75, 0.2)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={officeImage2}
                    alt="Team working together"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={2400}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <GroupIcon sx={{ fontSize: 32, color: '#4355B9', mr: 2 }} />
                    <Typography variant="h4" component="h2" sx={{ color: '#13294B', fontWeight: 'bold' }}>
                      👥 Për kë është Eventify?
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                    Eventify është ndërtuar për:
                  </Typography>
                  <List>
                    {[
                      'Biznese që organizojnë evente të rregullta për klientë ose partnerë',
                      'Agjenci marketingu dhe PR që duan të menaxhojnë evente për klientët e tyre',
                      'Departamente HR dhe komunikimi që organizojnë trajnime dhe evente të brendshme',
                      'Çdo organizatë që kërkon një sistem të qartë për menaxhimin e eventeve'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ 
                        py: 1,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(8px)'
                        }
                      }}>
                        <ListItemIcon>
                          <StarIcon sx={{ color: '#4355B9' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{ 
                            fontWeight: 500
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Fade>
            </Grid>
          </Grid>
          
          {/* What Makes Us Different */}
          <Fade in={loaded} timeout={2600}>
            <Paper elevation={3} sx={{ 
              p: 4, 
              mb: 6, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
              backdropFilter: 'blur(10px)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#13294B',
                  mr: 2
                }}>
                  <LightbulbIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h4" component="h2" sx={{ color: '#13294B', fontWeight: 'bold' }}>
                  💡 Çfarë na dallon?
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                {[
                  'Përdorim i thjeshtë dhe ndërfaqe moderne',
                  'Personalizim i plotë i faqeve të eventeve',
                  'Shpejtësi dhe performancë në çdo pajisje',
                  'Mbështetje teknike dhe këshillim për çdo event',
                  'Optimizim për desktop dhe mobile'
                ].map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.6)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(19, 41, 75, 0.1)'
                      }
                    }}>
                      <CheckCircleIcon sx={{ color: '#4355B9', mr: 1.5 }} />
                      <Typography>
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
          
          {/* History Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={7}>
              <Fade in={loaded} timeout={2800}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <HistoryIcon sx={{ fontSize: 32, color: '#4355B9', mr: 2 }} />
                    <Typography variant="h4" component="h2" sx={{ color: '#13294B', fontWeight: 'bold' }}>
                      📖 Historia jonë, nga një ide në realitet
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                    Eventify lindi nga nevoja reale e bizneseve për një mënyrë më të zgjuar dhe më të strukturuar për të menaxhuar eventet. 
                    Duke kombinuar përvojën në teknologji me njohuritë në menaxhimin e eventeve, ndërtuam një platformë që fokusohet në 
                    lehtësinë e përdorimit, efikasitetin, dhe eksperiencën e pjesëmarrësve.
                  </Typography>
                  <Box sx={{ 
                    mt: 4, 
                    p: 3, 
                    borderRadius: 2,
                    bgcolor: 'rgba(67, 85, 185, 0.08)',
                    border: '1px solid rgba(67, 85, 185, 0.2)'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      🟢 Na bashkohu
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Qindra biznese tashmë po organizojnë eventet e tyre me Eventify – më shpejt, më lehtë dhe me më shumë ndikim.
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Provo Eventify sot dhe transformo mënyrën si organizon evente.
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5}>
              <Zoom in={loaded} timeout={3000}>
                <Card elevation={6} sx={{ 
                  height: '100%', 
                  minHeight: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 30px rgba(19, 41, 75, 0.2)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={officeImage3}
                    alt="Our team"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Zoom>
            </Grid>
          </Grid>
          
          {/* CTA Section */}
          <Fade in={loaded} timeout={3200}>
            <Box sx={{ 
              textAlign: 'center', 
              mt: 8, 
              py: 5, 
              px: { xs: 2, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #13294B 0%, #4355B9 100%)',
              boxShadow: '0 10px 30px rgba(19, 41, 75, 0.3)'
            }}>
              <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
                Gati për të filluar me Eventify?
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', mb: 4, fontSize: '1.1rem' }}>
                Transformo mënyrën si organizon dhe menaxhon eventet me platformën tonë të avancuar
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Button 
                  component={Link} 
                  to="/register"
                  variant="contained" 
                  size="large"
                  className="pulse-button"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#13294B',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: '#f0f0f0',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  REGJISTROHU TANI
                </Button>
                <Button 
                  component={Link} 
                  to="/contact"
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  KONTAKTO
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 