import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 240, // Width of the sidebar
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    padding: theme.spacing(2),
  },
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Event Registration',
      message: 'Someone registered for your event "Team Building Workshop"',
      timestamp: '2024-03-19T10:30:00',
      read: false,
    },
    {
      id: 2,
      title: 'Event Reminder',
      message: 'Your event "Monthly Team Meeting" starts in 1 hour',
      timestamp: '2024-03-19T09:00:00',
      read: true,
    },
    {
      id: 3,
      title: 'New Comment',
      message: 'A participant left a comment on your event',
      timestamp: '2024-03-18T15:45:00',
      read: false,
    },
  ]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleDelete = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Notifications
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Stay updated with your event activities
            </Typography>
          </Box>

          <Paper sx={{ p: 3 }}>
            <List>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  sx={{
                    opacity: notification.read ? 0.7 : 1,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <ListItemIcon>
                    <NotificationsIcon color={notification.read ? "disabled" : "primary"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        {notification.message}
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(notification.timestamp)}
                        </Typography>
                      </>
                    }
                  />
                  <Box>
                    {!notification.read && (
                      <IconButton
                        onClick={() => handleMarkAsRead(notification.id)}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => handleDelete(notification.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </NotificationItem>
              ))}
              {notifications.length === 0 && (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                  No notifications to display
                </Typography>
              )}
            </List>
          </Paper>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
};

export default Notifications; 