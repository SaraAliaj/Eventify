import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  NotificationsActive as NotificationsIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Today as TodayIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { eventService } from '../services/api';

const Notifications = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data || []);
      generateNotifications(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNotifications = (events) => {
    const now = new Date();
    const notifications = [];

    // Filter upcoming events only
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate > now;
    });

    // Sort by date
    upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    // Generate different types of notifications
    upcomingEvents.forEach(event => {
      const eventDate = new Date(event.startDate);
      const diffTime = eventDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let message = '';
      let type = 'info';
      let icon = <EventIcon />;

      if (diffDays === 1) {
        message = `Nesër keni eventin "${event.title}"`;
        type = 'warning';
        icon = <WarningIcon />;
      } else if (diffDays <= 3) {
        message = `Keni eventin "${event.title}" për ${diffDays} ditë`;
        type = 'warning';
        icon = <WarningIcon />;
      } else if (diffDays <= 7) {
        message = `Keni eventin "${event.title}" për ${diffDays} ditë`;
        type = 'info';
        icon = <ScheduleIcon />;
      } else if (diffDays <= 30) {
        message = `Keni eventin "${event.title}" për ${diffDays} ditë`;
        type = 'default';
        icon = <EventIcon />;
      }

      if (message) {
        notifications.push({
          id: event.id,
          message,
          type,
          icon,
          date: eventDate.toLocaleDateString('sq-AL'),
          daysLeft: diffDays
        });
      }
    });

    // Add summary notifications
    if (upcomingEvents.length > 0) {
      const todayEvents = upcomingEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.toDateString() === now.toDateString();
      });

      const thisWeekEvents = upcomingEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        const diffTime = eventDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      });

      // Add today events notification
      if (todayEvents.length > 0) {
        notifications.unshift({
          id: 'today',
          message: `Keni ${todayEvents.length} event${todayEvents.length > 1 ? 'e' : ''} sot`,
          type: 'error',
          icon: <TodayIcon />,
          date: 'Sot',
          daysLeft: 0
        });
      }

      // Add weekly summary
      if (thisWeekEvents.length > 1) {
        notifications.unshift({
          id: 'week',
          message: `Keni ${thisWeekEvents.length} evente këtë javë`,
          type: 'info',
          icon: <EventIcon />,
          date: 'Këtë javë',
          daysLeft: null
        });
      }
    }

    setNotifications(notifications);
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <NotificationsIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Njoftimet
        </Typography>
      </Box>

      {/* Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Nuk keni njoftimet e reja
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kur të keni evente të ardhshme, do t'i shihni njoftimet këtu.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              Njoftimet e Eventeve
            </Typography>
            
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem>
                    <ListItemIcon>
                      {notification.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.message}
                      secondary={notification.date}
                    />
                    {notification.daysLeft !== null && (
                      <Chip
                        label={notification.daysLeft === 0 ? 'Sot' : `${notification.daysLeft} ditë`}
                        color={getChipColor(notification.type)}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </ListItem>
                  {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      {events.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Përmbledhja
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<EventIcon />}
                label={`${events.length} evente gjithsej`}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<ScheduleIcon />}
                label={`${events.filter(e => new Date(e.startDate) > new Date()).length} të ardhshme`}
                color="info"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Notifications; 