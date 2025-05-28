import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { authService, eventService } from '../services/api';
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
  const [events, setEvents] = useState([]);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    category: '',
    capacity: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Fetch user's events
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data);
      console.log('Fetched events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë marrjes së eventeve',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login?redirect=true';
  };

  const handleCreateEventOpen = () => {
    setOpenCreateEvent(true);
  };

  const handleCreateEventClose = () => {
    setOpenCreateEvent(false);
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      category: '',
      capacity: 10
    });
  };

  const handleCreateEvent = async () => {
    try {
      setCreatingEvent(true);
      
      // Format data for API
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        location: newEvent.location,
        startDate: `${newEvent.date}T${newEvent.time}:00`, // Format as ISO string
        category: newEvent.category,
        capacity: newEvent.capacity
      };
      
      console.log('Sending event data:', eventData);
      
      // Call API to create event
      const response = await eventService.createEvent(eventData);
      console.log('Event created:', response.data);
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Eventi u krijua me sukses!',
        severity: 'success'
      });
      
      // Close dialog and refresh events
      handleCreateEventClose();
      fetchEvents();
      
    } catch (error) {
      console.error('Error creating event:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë krijimit të eventit. Ju lutemi provoni përsëri.',
        severity: 'error'
      });
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleEventChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading && !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Format the events for display
  const upcomingEvents = events.length > 0 ? events.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.startDate).toLocaleDateString('sq-AL', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: `${new Date(event.startDate).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })} - ${event.endDate ? new Date(event.endDate).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' }) : ''}`,
    location: event.location || 'Pa vendndodhje',
    attendees: event.attendees?.length || 0,
    category: event.category || 'Pa kategori'
  })) : [];

  return (
    <Box className="dashboard-container">
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : upcomingEvents.length === 0 ? (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" color="textSecondary">
              Nuk keni evente të ardhshme
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Klikoni "Krijo Event" për të shtuar eventin tuaj të parë
            </Typography>
          </Box>
        ) : (
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
        )}
      </Container>

      {/* Create Event Dialog */}
      <Dialog 
        open={openCreateEvent} 
        onClose={handleCreateEventClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Krijo Event të Ri</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Titulli i Eventit"
              variant="outlined"
              fullWidth
              required
              value={newEvent.title}
              onChange={(e) => handleEventChange('title', e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Përshkrimi"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => handleEventChange('description', e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Vendndodhja"
              variant="outlined"
              fullWidth
              required
              value={newEvent.location}
              onChange={(e) => handleEventChange('location', e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  value={newEvent.date}
                  onChange={(e) => handleEventChange('date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ora"
                  type="time"
                  variant="outlined"
                  fullWidth
                  required
                  value={newEvent.time}
                  onChange={(e) => handleEventChange('time', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Kategoria"
                  variant="outlined"
                  fullWidth
                  value={newEvent.category}
                  onChange={(e) => handleEventChange('category', e.target.value)}
                >
                  {eventCategories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kapaciteti"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={newEvent.capacity}
                  onChange={(e) => handleEventChange('capacity', e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCreateEventClose} color="inherit">
            Anulo
          </Button>
          <Button 
            onClick={handleCreateEvent} 
            variant="contained" 
            color="primary"
            disabled={creatingEvent || !newEvent.title || !newEvent.location || !newEvent.date || !newEvent.time}
            startIcon={creatingEvent && <CircularProgress size={20} color="inherit" />}
          >
            {creatingEvent ? 'Duke krijuar...' : 'Krijo Event'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          elevation={6} 
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 