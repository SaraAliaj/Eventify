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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  Tooltip,
  Badge
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Today as TodayIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { eventService, authService } from '../services/api';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [dayEventsDialogOpen, setDayEventsDialogOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  const monthNames = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ];

  const dayNames = ['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'];

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    fetchEvents();
  }, []);

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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = new Date(firstDay);
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    // Adjust so Monday = 0
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    
    // Start from the Monday of the week containing the first day
    startDate.setDate(1 - firstDayOfWeek);
    
    const days = [];
    const current = new Date(startDate);
    
    // Generate 6 weeks (42 days) to ensure full calendar grid
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date, dayEvents) => {
    if (dayEvents.length > 0) {
      setSelectedDate(date);
      setSelectedDateEvents(dayEvents);
      setDayEventsDialogOpen(true);
    }
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate || event.startDate);

    if (eventStart > now) return { label: 'Të ardhshme', color: 'primary' };
    if (eventStart <= now && eventEnd >= now) return { label: 'Në vazhdim', color: 'warning' };
    return { label: 'Të përfunduara', color: 'default' };
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleCreateEvent = () => {
    navigate('/dashboard');
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Kalendari
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

      {/* Calendar Navigation */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigateMonth(-1)} size="large">
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ minWidth: 200, textAlign: 'center' }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Typography>
              <IconButton onClick={() => navigateMonth(1)} size="large">
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <Button
              variant="outlined"
              startIcon={<TodayIcon />}
              onClick={goToToday}
            >
              Sot
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent sx={{ p: 0 }}>
            {/* Day Headers */}
            <Grid container sx={{ backgroundColor: 'grey.100' }}>
              {dayNames.map((dayName) => (
                <Grid item xs key={dayName} sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {dayName}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Days */}
            <Grid container sx={{ minHeight: 600 }}>
              {days.map((date, index) => {
                const dayEvents = getEventsForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDate = isToday(date);
                
                return (
                  <Grid 
                    item 
                    xs 
                    key={index}
                    sx={{ 
                      minHeight: 100,
                      borderRight: '1px solid',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      p: 1,
                      cursor: dayEvents.length > 0 ? 'pointer' : 'default',
                      '&:hover': dayEvents.length > 0 ? {
                        backgroundColor: 'action.hover'
                      } : {},
                      backgroundColor: isTodayDate ? 'primary.50' : 'transparent'
                    }}
                    onClick={() => handleDateClick(date, dayEvents)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: isTodayDate ? 'bold' : 'normal',
                          color: isCurrentMonthDay ? 'text.primary' : 'text.disabled',
                          backgroundColor: isTodayDate ? 'primary.main' : 'transparent',
                          color: isTodayDate ? 'white' : (isCurrentMonthDay ? 'text.primary' : 'text.disabled'),
                          borderRadius: isTodayDate ? '50%' : 0,
                          width: isTodayDate ? 24 : 'auto',
                          height: isTodayDate ? 24 : 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {date.getDate()}
                      </Typography>
                      {dayEvents.length > 0 && (
                        <Badge 
                          badgeContent={dayEvents.length} 
                          color="primary" 
                          sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}
                        />
                      )}
                    </Box>
                    
                    {/* Event indicators */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <Tooltip key={eventIndex} title={event.title} arrow>
                          <Box
                            sx={{
                              backgroundColor: getEventStatus(event).color === 'primary' ? 'primary.main' : 
                                              getEventStatus(event).color === 'warning' ? 'warning.main' : 'grey.400',
                              color: 'white',
                              borderRadius: 1,
                              px: 0.5,
                              py: 0.25,
                              fontSize: '0.7rem',
                              fontWeight: 'medium',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              cursor: 'pointer'
                            }}
                          >
                            {event.title}
                          </Box>
                        </Tooltip>
                      ))}
                      {dayEvents.length > 3 && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.6rem',
                            textAlign: 'center'
                          }}
                        >
                          +{dayEvents.length - 3} më shumë
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Day Events Dialog */}
      <Dialog 
        open={dayEventsDialogOpen} 
        onClose={() => setDayEventsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon />
            <Typography variant="h6">
              Eventet për {selectedDate && selectedDate.toLocaleDateString('sq-AL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedDateEvents.map((event, index) => {
              const status = getEventStatus(event);
              return (
                <React.Fragment key={event.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" component="h3">
                            {event.title}
                          </Typography>
                          <Chip 
                            label={status.label} 
                            color={status.color} 
                            size="small"
                          />
                        </Box>
                        
                        {event.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {event.description}
                          </Typography>
                        )}

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {new Date(event.startDate).toLocaleTimeString('sq-AL', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                                {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('sq-AL', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}`}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {event.location || 'Pa vendndodhje'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.attendees?.length || 0} / {event.capacity || 'N/A'} pjesëmarrës
                          </Typography>
                          {event.category && (
                            <Chip 
                              label={event.category} 
                              variant="outlined" 
                              size="small" 
                              sx={{ ml: 'auto' }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </ListItem>
                  {index < selectedDateEvents.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDayEventsDialogOpen(false)}>
            Mbyll
          </Button>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setDayEventsDialogOpen(false);
              handleCreateEvent();
            }}
          >
            Krijo Event të Ri
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

export default Calendar; 