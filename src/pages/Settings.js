import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Button,
  TextField,
  FormControlLabel,
  Alert,
  Snackbar,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

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

const SettingsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC+1',
  });

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
    showSnackbar('Settings updated successfully');
  };

  const handleProfileChange = (field) => (event) => {
    setProfile({
      ...profile,
      [field]: event.target.value,
    });
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    showSnackbar('Profile updated successfully');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Manage your account settings and preferences
            </Typography>
          </Box>

          <SettingsSection>
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profile.firstName}
                    onChange={handleProfileChange('firstName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profile.lastName}
                    onChange={handleProfileChange('lastName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange('email')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.phone}
                    onChange={handleProfileChange('phone')}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{ mt: 3 }}
              >
                Save Changes
              </Button>
            </Box>
          </SettingsSection>

          <SettingsSection>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive email updates about your events"
                />
                <Switch
                  edge="end"
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange('emailNotifications')}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Push Notifications"
                  secondary="Receive push notifications on your device"
                />
                <Switch
                  edge="end"
                  checked={settings.pushNotifications}
                  onChange={handleSettingChange('pushNotifications')}
                />
              </ListItem>
            </List>
          </SettingsSection>

          <SettingsSection>
            <Typography variant="h6" gutterBottom>
              Appearance
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Use dark theme across the application"
                />
                <Switch
                  edge="end"
                  checked={settings.darkMode}
                  onChange={handleSettingChange('darkMode')}
                />
              </ListItem>
            </List>
          </SettingsSection>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
};

export default Settings; 