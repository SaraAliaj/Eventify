import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Grid,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Save as SaveIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { authService } from '../services/api';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    eventReminders: true,
    language: 'sq',
    theme: 'light'
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || ''
      });
    }
  }, []);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Simulate saving profile
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setNotification({
      open: true,
      message: 'Profili u përditësua me sukses!',
      severity: 'success'
    });
  };

  const handleSavePreferences = () => {
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    setNotification({
      open: true,
      message: 'Cilësimet u ruajtën me sukses!',
      severity: 'success'
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Cilësimet
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} />
                Profili i Përdoruesit
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  {getInitials(profileData.firstName, profileData.lastName)}
                </Avatar>
              </Box>

              <TextField
                fullWidth
                label="Emri"
                value={profileData.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Mbiemri"
                value={profileData.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                sx={{ mb: 3 }}
              />
              
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveProfile}
                fullWidth
              >
                Ruaj Profilin
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* App Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                Njoftimet
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Njoftimet me Email"
                    secondary="Merr njoftimet për eventet në email"
                  />
                  <Switch
                    checked={preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Përmbledhja Javore"
                    secondary="Merr përmbledhjen e eventeve çdo javë"
                  />
                  <Switch
                    checked={preferences.weeklyDigest}
                    onChange={(e) => handlePreferenceChange('weeklyDigest', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Kujtuesit e Eventeve"
                    secondary="Njoftohu para se të fillojë eventi"
                  />
                  <Switch
                    checked={preferences.eventReminders}
                    onChange={(e) => handlePreferenceChange('eventReminders', e.target.checked)}
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LanguageIcon sx={{ mr: 1 }} />
                Preferencat e Aplikacionit
              </Typography>
              
              <TextField
                select
                fullWidth
                label="Gjuha"
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="sq">Shqip</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </TextField>
              
              <TextField
                select
                fullWidth
                label="Tema"
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="light">E Çelët</MenuItem>
                <MenuItem value="dark">E Errët</MenuItem>
                <MenuItem value="auto">Automatike</MenuItem>
              </TextField>
              
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSavePreferences}
                fullWidth
              >
                Ruaj Cilësimet
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Security */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1 }} />
                Siguria e Llogarisë
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" disabled>
                  Ndrysho Fjalëkalimin
                </Button>
                <Button variant="outlined" disabled>
                  Eksporto të Dhënat
                </Button>
                <Button variant="outlined" color="error" disabled>
                  Fshi Llogarinë
                </Button>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                * Këto funksione do të jenë të disponueshme në versionin e ardhshëm
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000}
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

export default Settings; 