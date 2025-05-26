import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Events', icon: <EventIcon />, path: '/events' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Attendees', icon: <PeopleIcon />, path: '/attendees' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    window.location.href = '/login';
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      {/* Logo and Brand */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 16px',
          color: 'primary.main',
        }}
      >
        <EventIcon sx={{ fontSize: 32, marginRight: 1 }} />
        <Typography variant="h6" noWrap component="div">
          Eventify
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Navigation Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              margin: '8px 10px',
              padding: '8px 16px',
              borderRadius: '8px',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === item.path ? 'white' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      {/* Logout Button */}
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            margin: '8px 10px',
            padding: '8px 16px',
            borderRadius: '8px',
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.dark',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  if (isMobile) {
    return null; // Mobile sidebar will be handled by a different component
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar; 