import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { eventService, authService } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  const eventCategories = [
    'Mbledhje', 
    'Konferencë', 
    'Workshop', 
    'Sociale', 
    'Team Building'
  ];

  const statusOptions = [
    { value: 'upcoming', label: 'Të ardhshme' },
    { value: 'ongoing', label: 'Në vazhdim' },
    { value: 'completed', label: 'Të përfunduara' }
  ];

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterCategory, filterStatus]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data || []);
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

  const filterEvents = () => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter(event => event.category === filterCategory);
    }

    // Status filter
    if (filterStatus) {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate || event.startDate);
        
        switch (filterStatus) {
          case 'upcoming':
            return eventStart > now;
          case 'ongoing':
            return eventStart <= now && eventEnd >= now;
          case 'completed':
            return eventEnd < now;
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate || event.startDate);

    if (eventStart > now) return { label: 'Të ardhshme', color: 'primary' };
    if (eventStart <= now && eventEnd >= now) return { label: 'Në vazhdim', color: 'warning' };
    return { label: 'Të përfunduara', color: 'default' };
  };

  const handleMenuClick = (event, eventData) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    try {
      await eventService.deleteEvent(selectedEvent.id);
      setNotification({
        open: true,
        message: 'Eventi u fshi me sukses!',
        severity: 'success'
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë fshirjes së eventit',
        severity: 'error'
      });
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handleCreateEvent = () => {
    navigate('/dashboard');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterStatus('');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Eventet e Mia
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateEvent}
          size="large"
        >
          Krijo Event të Ri
        </Button>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Kërko evente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Kategoria"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">Të gjitha</MenuItem>
                {eventCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Statusi"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">Të gjitha</MenuItem>
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                onClick={clearFilters}
                fullWidth
                startIcon={<FilterIcon />}
              >
                Pastro
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Events Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'evente'} 
          {searchTerm || filterCategory || filterStatus ? ' (të filtruara)' : ''}
        </Typography>
      </Box>

      {/* Events Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredEvents.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {events.length === 0 ? 'Nuk keni krijuar asnjë event' : 'Nuk u gjetën evente'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {events.length === 0 
                ? 'Filloni duke krijuar eventin tuaj të parë!'
                : 'Provoni të ndryshoni filtrat e kërkimit'
              }
            </Typography>
            {events.length === 0 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreateEvent}
              >
                Krijo Event të Ri
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => {
            const status = getEventStatus(event);
            return (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Chip 
                          label={status.label} 
                          color={status.color} 
                          size="small" 
                          sx={{ mb: 1 }}
                        />
                        {event.category && (
                          <Chip 
                            label={event.category} 
                            variant="outlined" 
                            size="small" 
                            sx={{ ml: 1, mb: 1 }}
                          />
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, event)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="h6" component="h3" gutterBottom>
                      {event.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {event.description ? 
                        (event.description.length > 100 
                          ? `${event.description.substring(0, 100)}...`
                          : event.description
                        ) : 'Pa përshkrim'
                      }
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.startDate).toLocaleDateString('sq-AL', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.location || 'Pa vendndodhje'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.attendees?.length || 0} / {event.capacity || 'N/A'} pjesëmarrës
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          // Handle view event
          handleMenuClose();
        }}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shiko Detajet</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          // Handle edit event
          handleMenuClose();
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ndrysho</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => {
            setDeleteDialogOpen(true);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Fshi</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Konfirmo Fshirjen</DialogTitle>
        <DialogContent>
          <Typography>
            Je i sigurt që dëshiron ta fshish eventin "{selectedEvent?.title}"? 
            Ky veprim nuk mund të zhbëhet.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Anulo
          </Button>
          <Button 
            onClick={handleDeleteEvent} 
            color="error" 
            variant="contained"
          >
            Fshi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
          elevation={6} 
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Events; 