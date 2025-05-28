import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Tabs, Tab, Paper, 
  Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogActions, 
  DialogContent, DialogTitle, TextField, MenuItem,
  Select, FormControl, InputLabel, Grid, Card, CardContent,
  CardHeader, IconButton, Avatar, Divider, List, ListItem,
  ListItemText, ListItemAvatar, ListItemSecondaryAction,
  AppBar, Toolbar, Menu
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
  Menu as MenuIcon
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
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    category: '',
    capacity: 10
  });

  // Dialog states
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [newInvitation, setNewInvitation] = useState({
    email: '',
    eventId: '',
    message: ''
  });

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user || user.role !== 'admin') {
      console.log('Unauthorized access attempt to admin panel');
      navigate('/login?redirect=true');
      return;
    }
    
    setUser(user);
  }, [navigate]);

  // Fetch users and events
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token available');
          setError('Authentication required. Please log in again.');
          setIsLoading(false);
          navigate('/login?redirect=true');
          return;
        }

        // Set authorization header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Try getting users
        try {
          console.log('Attempting to fetch users...');
          const usersResponse = await axios.get('http://localhost:5000/api/admin/users');
          console.log('Users fetch successful:', usersResponse.data);
          setUsers(usersResponse.data);
          setActiveUsers(Math.floor(usersResponse.data.length * 0.7));
        } catch (userError) {
          console.error('Failed to fetch users:', userError.response?.data || userError.message);
          if (userError.response?.status === 401) {
            navigate('/login?redirect=true');
            return;
          }
          setError(`Failed to load users: ${userError.response?.data?.message || userError.message}`);
        }
        
        // Try getting events
        try {
          console.log('Attempting to fetch events...');
          const eventsResponse = await axios.get('http://localhost:5000/api/admin/events');
          console.log('Events fetch successful:', eventsResponse.data);
          setEvents(eventsResponse.data);
          
          const today = new Date().toISOString().split('T')[0];
          const todayEvents = eventsResponse.data.filter(event => 
            new Date(event.startDate).toISOString().split('T')[0] === today
          );
          setTodaysEvents(todayEvents);
        } catch (eventError) {
          console.error('Failed to fetch events:', eventError.response?.data || eventError.message);
          if (eventError.response?.status === 401) {
            navigate('/login?redirect=true');
            return;
          }
          if (!error) {
            setError(`Failed to load events: ${eventError.response?.data?.message || eventError.message}`);
          }
        }
      } catch (error) {
        console.error('General error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login?redirect=true');
          return;
        }
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // User management functions
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setOpenUserDialog(true);
  };

  const handleNewUser = () => {
    setOpenNewUserDialog(true);
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUsers([...users, response.data.user]);
      setOpenNewUserDialog(false);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Dështoi shtimi i përdoruesit');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Je i sigurt që dëshiron ta fshish këtë përdorues?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Dështoi fshirja e përdoruesit');
    }
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${currentUser.id}`, 
        currentUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUsers(users.map(user => 
        user.id === currentUser.id ? response.data : user
      ));
      
      setOpenUserDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Dështoi përditësimi i përdoruesit');
    }
  };

  // Event management functions
  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setOpenEventDialog(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Je i sigurt që dëshiron ta fshish këtë event?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setEvents(events.filter(event => event.id !== eventId));
      setTodaysEvents(todaysEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Dështoi fshirja e eventit');
    }
  };

  const handleSaveEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/admin/events/${currentEvent.id}`, 
        currentEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setEvents(events.map(event => 
        event.id === currentEvent.id ? response.data : event
      ));
      
      setOpenEventDialog(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Dështoi përditësimi i eventit');
    }
  };

  // Invitation management functions
  const handleOpenInviteDialog = (eventId) => {
    setNewInvitation({
      ...newInvitation,
      eventId
    });
    setOpenInviteDialog(true);
  };

  const handleSendInvitation = async () => {
    try {
      const token = localStorage.getItem('token');
      // This would be a real API call in production
      // await axios.post('http://localhost:5000/api/admin/invitations', newInvitation, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // Mock data for now
      const mockInvitation = {
        id: invitations.length + 1,
        email: newInvitation.email,
        eventId: newInvitation.eventId,
        eventName: events.find(e => e.id === parseInt(newInvitation.eventId))?.title || 'Event',
        status: 'pending'
      };
      
      setInvitations([...invitations, mockInvitation]);
      setOpenInviteDialog(false);
      setNewInvitation({
        email: '',
        eventId: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Dështoi dërgimi i ftesës');
    }
  };

  const handleInvitationAction = (id, status) => {
    setInvitations(invitations.map(inv => 
      inv.id === id ? { ...inv, status } : inv
    ));
  };

  // Handle user dialog field changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // Handle event dialog field changes
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };

  const handleInvitationChange = (e) => {
    const { name, value } = e.target;
    setNewInvitation({
      ...newInvitation,
      [name]: value
    });
  };

  // Add new event handler
  const handleAddEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token available');
        navigate('/login?redirect=true');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/events',
        newEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setEvents([...events, response.data]);
      
      // Update today's events if the new event is today
      const today = new Date().toISOString().split('T')[0];
      const eventDate = new Date(response.data.startDate).toISOString().split('T')[0];
      if (today === eventDate) {
        setTodaysEvents([...todaysEvents, response.data]);
      }
      
      setOpenNewEventDialog(false);
      setNewEvent({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        category: '',
        capacity: 10
      });
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response?.status === 401) {
        navigate('/login?redirect=true');
        return;
      }
      alert('Dështoi krijimi i eventit');
    }
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <Container sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Duke u ngarkuar panelin e administratës...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ju lutemi prisni ndërsa po marrim të dhënat
          </Typography>
        </Box>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container sx={{ py: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 500 }}>
          <Typography variant="h5" gutterBottom color="error">
            Ka ndodhur një gabim
          </Typography>
          <Typography variant="body1" paragraph>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{ mr: 2 }}
          >
            Provo përsëri
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            Kthehu tek hyrja
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Header */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Eventify Admin
            </Typography>
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
      
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Paneli i Administratorit
          </Typography>
          
          {/* Dashboard Statistics */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Përdoruesit Total
                        </Typography>
                        <Typography variant="h4">
                          {users.length}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <PeopleIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Përdorues Aktivë
                        </Typography>
                        <Typography variant="h4">
                          {activeUsers}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'success.light' }}>
                        <PersonIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Eventet Sot
                        </Typography>
                        <Typography variant="h4">
                          {todaysEvents.length}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        <EventIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Statistika
                        </Typography>
                        <Typography variant="h4">
                          {events.length}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'info.light' }}>
                        <BarChartIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          
          <Paper sx={{ mb: 4 }}>
            <Tabs value={value} onChange={handleTabChange} aria-label="admin tabs">
              <Tab label="Përdoruesit" />
              <Tab label="Eventet" />
              <Tab label="Ftesat" />
              <Tab label="Eventet e Sotme" />
            </Tabs>
            
            <TabPanel value={value} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" gutterBottom>Menaxhimi i Përdoruesve</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<PersonAddIcon />} 
                  onClick={handleNewUser}>
                  Shto Përdorues
                </Button>
              </Box>
              
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Emri</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Përdoruesi</TableCell>
                        <TableCell>Roli</TableCell>
                        <TableCell>Veprime</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{`${user.firstName || ''} ${user.lastName || ''}`}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.role === 'admin' ? 'Administrator' : 'Përdorues'}</TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              startIcon={<EditIcon />}
                              onClick={() => handleEditUser(user)}
                            >
                              Ndrysho
                            </Button>
                            <Button 
                              size="small" 
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Fshi
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" gutterBottom>Menaxhimi i Eventeve</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<EventIcon />}
                  onClick={() => setOpenNewEventDialog(true)}
                >
                  Krijo Event
                </Button>
              </Box>
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Titulli</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Lokacioni</TableCell>
                        <TableCell>Kapaciteti</TableCell>
                        <TableCell>Pjesëmarrësit</TableCell>
                        <TableCell>Veprime</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.id}</TableCell>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.capacity}</TableCell>
                          <TableCell>{event.attendeeCount || 0}</TableCell>
                          <TableCell>
                            <Button 
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => handleEditEvent(event)}
                            >
                              Ndrysho
                            </Button>
                            <Button 
                              size="small" 
                              color="error" 
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              Fshi
                            </Button>
                            <Button 
                              size="small" 
                              color="primary" 
                              startIcon={<EmailIcon />}
                              onClick={() => handleOpenInviteDialog(event.id)}
                            >
                              Ftesa
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
            
            <TabPanel value={value} index={2}>
              <Typography variant="h6" gutterBottom>Ftesat për Evente</Typography>
              <List>
                {invitations.map((invitation) => (
                  <React.Fragment key={invitation.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={`${invitation.email}`}
                        secondary={`Eventi: ${invitation.eventName} - Statusi: ${
                          invitation.status === 'pending' ? 'Në pritje' : 
                          invitation.status === 'accepted' ? 'Pranuar' : 'Refuzuar'
                        }`}
                      />
                      <ListItemSecondaryAction>
                        {invitation.status === 'pending' && (
                          <>
                            <IconButton 
                              edge="end" 
                              color="success"
                              onClick={() => handleInvitationAction(invitation.id, 'accepted')}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton 
                              edge="end" 
                              color="error"
                              onClick={() => handleInvitationAction(invitation.id, 'rejected')}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
            
            <TabPanel value={value} index={3}>
              <Typography variant="h6" gutterBottom>Eventet e Sotme</Typography>
              {todaysEvents.length === 0 ? (
                <Typography>Nuk ka evente për sot.</Typography>
              ) : (
                <Grid container spacing={3}>
                  {todaysEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                      <Card>
                        <CardHeader
                          title={event.title}
                          subheader={`${new Date(event.startDate).toLocaleDateString()} - ${event.location}`}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {event.description?.substring(0, 100)}...
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" display="block">
                              Kapaciteti: {event.capacity}
                            </Typography>
                            <Typography variant="caption" display="block">
                              Pjesëmarrës: {event.attendeeCount || 0}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
          </Paper>
        </Box>

        {/* User Edit Dialog */}
        <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
          <DialogTitle>Ndrysho Përdoruesin</DialogTitle>
          <DialogContent>
            {currentUser && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Emri"
                  name="firstName"
                  value={currentUser.firstName || ''}
                  onChange={handleUserChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Mbiemri"
                  name="lastName"
                  value={currentUser.lastName || ''}
                  onChange={handleUserChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Email"
                  name="email"
                  value={currentUser.email || ''}
                  onChange={handleUserChange}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Roli</InputLabel>
                  <Select
                    name="role"
                    value={currentUser.role || 'user'}
                    onChange={handleUserChange}
                  >
                    <MenuItem value="user">Përdorues</MenuItem>
                    <MenuItem value="admin">Administrator</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUserDialog(false)}>Anulo</Button>
            <Button onClick={handleSaveUser} variant="contained">Ruaj</Button>
          </DialogActions>
        </Dialog>

        {/* New User Dialog */}
        <Dialog open={openNewUserDialog} onClose={() => setOpenNewUserDialog(false)}>
          <DialogTitle>Shto Përdorues të Ri</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Emri"
                name="firstName"
                value={newUser.firstName}
                onChange={handleNewUserChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Mbiemri"
                name="lastName"
                value={newUser.lastName}
                onChange={handleNewUserChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                type="email"
                required
                value={newUser.email}
                onChange={handleNewUserChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Fjalëkalimi"
                name="password"
                type="password"
                required
                value={newUser.password}
                onChange={handleNewUserChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Roli</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                >
                  <MenuItem value="user">Përdorues</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewUserDialog(false)}>Anulo</Button>
            <Button onClick={handleAddUser} variant="contained">Shto</Button>
          </DialogActions>
        </Dialog>

        {/* Event Edit Dialog */}
        <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
          <DialogTitle>Ndrysho Eventin</DialogTitle>
          <DialogContent>
            {currentEvent && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Titulli"
                  name="title"
                  value={currentEvent.title || ''}
                  onChange={handleEventChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Përshkrimi"
                  name="description"
                  multiline
                  rows={4}
                  value={currentEvent.description || ''}
                  onChange={handleEventChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Lokacioni"
                  name="location"
                  value={currentEvent.location || ''}
                  onChange={handleEventChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Data"
                  name="startDate"
                  type="datetime-local"
                  value={currentEvent.startDate ? new Date(currentEvent.startDate).toISOString().slice(0, 16) : ''}
                  onChange={handleEventChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Kapaciteti"
                  name="capacity"
                  type="number"
                  value={currentEvent.capacity || 0}
                  onChange={handleEventChange}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEventDialog(false)}>Anulo</Button>
            <Button onClick={handleSaveEvent} variant="contained">Ruaj</Button>
          </DialogActions>
        </Dialog>

        {/* Event Invitation Dialog */}
        <Dialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)}>
          <DialogTitle>Dërgo Ftesë</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                type="email"
                required
                value={newInvitation.email}
                onChange={handleInvitationChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Eventi</InputLabel>
                <Select
                  name="eventId"
                  value={newInvitation.eventId}
                  onChange={handleInvitationChange}
                >
                  {events.map(event => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="dense"
                label="Mesazhi"
                name="message"
                multiline
                rows={4}
                value={newInvitation.message}
                onChange={handleInvitationChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInviteDialog(false)}>Anulo</Button>
            <Button 
              onClick={handleSendInvitation} 
              variant="contained"
              disabled={!newInvitation.email || !newInvitation.eventId}
            >
              Dërgo
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add New Event Dialog */}
        <Dialog open={openNewEventDialog} onClose={() => setOpenNewEventDialog(false)}>
          <DialogTitle>Krijo Event të Ri</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Titulli"
                name="title"
                required
                value={newEvent.title}
                onChange={handleNewEventChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Përshkrimi"
                name="description"
                multiline
                rows={4}
                value={newEvent.description}
                onChange={handleNewEventChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Lokacioni"
                name="location"
                value={newEvent.location}
                onChange={handleNewEventChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Data e Fillimit"
                name="startDate"
                type="datetime-local"
                required
                value={newEvent.startDate}
                onChange={handleNewEventChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Data e Mbarimit"
                name="endDate"
                type="datetime-local"
                value={newEvent.endDate}
                onChange={handleNewEventChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Kategoria"
                name="category"
                value={newEvent.category}
                onChange={handleNewEventChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Kapaciteti"
                name="capacity"
                type="number"
                value={newEvent.capacity}
                onChange={handleNewEventChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewEventDialog(false)}>Anulo</Button>
            <Button 
              onClick={handleAddEvent} 
              variant="contained"
              disabled={!newEvent.title || !newEvent.startDate}
            >
              Krijo
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Admin; 