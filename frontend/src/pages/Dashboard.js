import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Card, 
  CardContent,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { authService } from '../services/api';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const eventCategories = [
  'Mbledhje', 
  'Konferencë', 
  'Workshop', 
  'Sociale', 
  'Team Building'
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    attendees: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const handleCreateEventOpen = () => {
    setOpenCreateEvent(true);
  };

  const handleCreateEventClose = () => {
    setOpenCreateEvent(false);
  };

  const handleCreateEvent = () => {
    // TODO: Call API to create event
    console.log('Creating event:', newEvent);
    handleCreateEventClose();
    // You would typically call an API here
  };

  const handleEventChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>Duke u ngarkuar...</Box>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const upcomingEvents = [
    {
      id: 1,
      title: 'Planifikimi i Q4',
      date: 'Sht, Qer 15',
      time: '10:00 - 12:00',
      location: 'Salla e Konferencave A',
      attendees: 12,
      category: 'Mbledhje'
    },
    {
      id: 2,
      title: 'Lançimi i Produktit',
      date: 'Enj, Qer 20',
      time: '15:00 - 21:00',
      location: 'Salla e Madhe, Hilton Hotel',
      attendees: 130,
      category: 'Konferencë'
    },
    {
      id: 3,
      title: 'Workshop Design Thinking',
      date: 'Mar, Qer 25',
      time: '09:00 - 17:00',
      location: 'Laboratori i Inovacionit',
      attendees: 25,
      category: 'Workshop'
    }
  ];

  return (
    <Box className="dashboard-container">
      <Grid container>
        <Grid item xs={12} md={3} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <AppBar position="static" color="default" elevation={0} className="app-header">
            <Toolbar>
              <Box className="search-container">
                <TextField
                  placeholder="Kërko evente sipas titullit, përshkrimit, ose vendndodhjes"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" className="header-icon">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#3f51b5' }}>
                    {user.firstName ? user.firstName.charAt(0) : user.email.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {user.firstName || user.email.split('@')[0]}
                    </Typography>
                  </Box>
                </Box>
                <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl" className="dashboard-content">
            <Box className="dashboard-header">
              <Typography variant="h4" className="welcome-text">
                Mirë se erdhe, {user.firstName || user.email.split('@')[0]}!
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleCreateEventOpen}
                className="create-button"
              >
                Krijo Event
              </Button>
            </Box>

            <Box className="section-header">
              <Typography variant="h5">Eventet e Ardhshme</Typography>
              <Button 
                variant="text" 
                color="primary"
                onClick={() => navigate('/calendar')}
              >
                Shiko të gjitha
              </Button>
            </Box>

            <Grid container spacing={3} className="events-grid">
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card className="event-card">
                    <CardContent>
                      <Box className="event-category" data-category={event.category}>
                        {event.category}
                      </Box>
                      <Typography variant="h6" className="event-title">
                        {event.title}
                      </Typography>
                      <Box className="event-details">
                        <Box className="event-detail-item">
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="body2">
                            {event.date}, {event.time}
                          </Typography>
                        </Box>
                        <Box className="event-detail-item">
                          <LocationOnIcon fontSize="small" />
                          <Typography variant="body2">
                            {event.location}
                          </Typography>
                        </Box>
                        <Box className="event-detail-item">
                          <PeopleAltIcon fontSize="small" />
                          <Typography variant="body2">
                            {event.attendees} pjesëmarrës
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        fullWidth
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="view-details-button"
                      >
                        Shiko Detajet
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>

      {/* Create Event Dialog */}
      <Dialog 
        open={openCreateEvent} 
        onClose={handleCreateEventClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Krijo Event të Ri</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Plotëso detajet për të krijuar një event ose mbledhje të re
          </Typography>
          
          <TextField
            label="Titulli i Eventit"
            fullWidth
            margin="normal"
            placeholder="Vendos titullin e eventit"
            value={newEvent.title}
            onChange={(e) => handleEventChange('title', e.target.value)}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data"
                fullWidth
                margin="normal"
                placeholder="DD/MM/VVVV"
                value={newEvent.date}
                onChange={(e) => handleEventChange('date', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ora"
                fullWidth
                margin="normal"
                placeholder="OO:MM"
                value={newEvent.time}
                onChange={(e) => handleEventChange('time', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          <TextField
            label="Vendndodhja"
            fullWidth
            margin="normal"
            placeholder="Vendos vendndodhjen"
            value={newEvent.location}
            onChange={(e) => handleEventChange('location', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Përshkrimi"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            placeholder="Jep detaje për eventin"
            value={newEvent.description}
            onChange={(e) => handleEventChange('description', e.target.value)}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Kategoria"
                fullWidth
                margin="normal"
                value={newEvent.category}
                onChange={(e) => handleEventChange('category', e.target.value)}
              >
                {eventCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pjesëmarrësit e Pritshëm"
                fullWidth
                margin="normal"
                placeholder="Numri i pjesëmarrësve"
                value={newEvent.attendees}
                onChange={(e) => handleEventChange('attendees', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleAltIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateEventClose} color="inherit">
            Anulo
          </Button>
          <Button 
            onClick={handleCreateEvent} 
            color="primary"
            variant="contained"
          >
            Krijo Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 