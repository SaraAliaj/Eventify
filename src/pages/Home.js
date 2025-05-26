import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <EventIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Event Management',
      description: 'Create and manage events with ease. Track registrations, send invitations, and more.',
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Calendar Integration',
      description: 'Sync your events with Google Calendar or Outlook. Never miss an important date.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Attendee Management',
      description: 'Manage attendees, track RSVPs, and communicate with participants effortlessly.',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Smart Notifications',
      description: 'Get timely reminders and updates about your events. Stay informed and organized.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Organize Events with Ease
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Streamline your event planning process with our comprehensive event management platform.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    bgcolor: 'white',
                    color: '#1976d2',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.png"
                alt="Event Management"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Join thousands of event organizers who trust our platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Sign Up Now
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 