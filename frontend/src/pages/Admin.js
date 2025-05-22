import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Container, Typography, Box, Tabs, Tab, Paper, 
  Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogActions, 
  DialogContent, DialogTitle, TextField, MenuItem,
  Select, FormControl, InputLabel, Grid, Card, CardContent,
  CardHeader, IconButton, Avatar, Divider, List, ListItem,
  ListItemText, ListItemAvatar, ListItemSecondaryAction,
  AppBar, Toolbar, Menu, Alert, Snackbar
} from '@mui/material';
import {
  People as PeopleIcon,
  Person as PersonIcon,
  Event as EventIcon,
  BarChart as BarChartIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Admin() {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editDialog, setEditDialog] = useState({ open: false, user: null });
  const [refreshKey, setRefreshKey] = useState(0);

  // Get token from localStorage
  const token = localStorage.getItem('token');
  const baseURL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch users and events in parallel
      const [usersResponse, eventsResponse] = await Promise.all([
        axios.get(`${baseURL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${baseURL}/admin/events`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setUsers(usersResponse.data);
      setEvents(eventsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      showSnackbar('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefresh = () => {
    setRefreshKey(old => old + 1);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${baseURL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar('User deleted successfully');
      handleRefresh();
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Error deleting user', 'error');
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await axios.put(`${baseURL}/admin/users/${userData.id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditDialog({ open: false, user: null });
      showSnackbar('User updated successfully');
      handleRefresh();
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Error updating user', 'error');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${baseURL}/admin/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar('Event deleted successfully');
      handleRefresh();
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Error deleting event', 'error');
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Header */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Eventify Admin
            </Typography>
            <IconButton 
              color="inherit" 
              onClick={handleRefresh}
              sx={{ ml: 2 }}
              title="Refresh data"
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              startIcon={<HomeIcon />}
            >
              Kthehu në Faqen Kryesore
            </Button>
            
            <Button 
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              startIcon={<LogoutIcon />}
            >
              Dilni
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<PeopleIcon />} label="Users" />
            <Tab icon={<EventIcon />} label="Events" />
            <Tab icon={<BarChartIcon />} label="Analytics" />
          </Tabs>

          {/* Users Tab */}
          <TabPanel value={value} index={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => setEditDialog({ open: true, user })}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteUser(user.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Events Tab */}
          <TabPanel value={value} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.id}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleDeleteEvent(event.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Analytics Tab */}
          <TabPanel value={value} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h3">{users.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Events</Typography>
                    <Typography variant="h3">{events.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Active Events</Typography>
                    <Typography variant="h3">
                      {events.filter(e => new Date(e.startDate) > new Date()).length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Container>

      {/* Edit User Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, user: null })}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              value={editDialog.user?.firstName || ''}
              onChange={(e) => setEditDialog({ 
                ...editDialog, 
                user: { ...editDialog.user, firstName: e.target.value }
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={editDialog.user?.lastName || ''}
              onChange={(e) => setEditDialog({ 
                ...editDialog, 
                user: { ...editDialog.user, lastName: e.target.value }
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={editDialog.user?.email || ''}
              onChange={(e) => setEditDialog({ 
                ...editDialog, 
                user: { ...editDialog.user, email: e.target.value }
              })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={editDialog.user?.role || ''}
                onChange={(e) => setEditDialog({ 
                  ...editDialog, 
                  user: { ...editDialog.user, role: e.target.value }
                })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, user: null })}>
            Cancel
          </Button>
          <Button onClick={() => handleEditUser(editDialog.user)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Admin; 