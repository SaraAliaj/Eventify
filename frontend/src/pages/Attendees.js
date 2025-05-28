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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Event as EventIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Help as HelpIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { attendeeService, eventService, authService } from '../services/api';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addAttendeeDialogOpen, setAddAttendeeDialogOpen] = useState(false);
  const [editAttendeeDialogOpen, setEditAttendeeDialogOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({
    name: '',
    email: '',
    eventId: '',
    status: 'invited'
  });
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'invited', label: 'I ftuar', color: 'default', icon: <ScheduleIcon /> },
    { value: 'confirmed', label: 'I konfirmuar', color: 'success', icon: <CheckCircleIcon /> },
    { value: 'declined', label: 'I refuzuar', color: 'error', icon: <CancelIcon /> },
    { value: 'maybe', label: 'Ndoshta', color: 'warning', icon: <HelpIcon /> }
  ];

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    fetchData();
  }, []);

  useEffect(() => {
    filterAttendees();
  }, [attendees, searchTerm, filterStatus, filterEvent]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch both attendees and events
      const [attendeesResponse, eventsResponse] = await Promise.all([
        attendeeService.getAttendees(),
        eventService.getEvents()
      ]);
      
      console.log('Attendees response:', attendeesResponse.data);
      console.log('Events response:', eventsResponse.data);
      
      setAttendees(attendeesResponse.data || []);
      setEvents(eventsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë marrjes së të dhënave',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAttendees = () => {
    let filtered = attendees;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(attendee =>
        attendee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.event?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter(attendee => attendee.status === filterStatus);
    }

    // Event filter
    if (filterEvent) {
      filtered = filtered.filter(attendee => attendee.eventId === parseInt(filterEvent));
    }

    setFilteredAttendees(filtered);
  };

  const getStatusConfig = (status) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const handleMenuClick = (event, attendee) => {
    setAnchorEl(event.currentTarget);
    setSelectedAttendee(attendee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAttendee(null);
  };

  const handleAddAttendee = async () => {
    try {
      const response = await attendeeService.createAttendee(newAttendee);
      setNotification({
        open: true,
        message: 'Pjesëmarrësi u shtua me sukses!',
        severity: 'success'
      });
      fetchData();
      setAddAttendeeDialogOpen(false);
      setNewAttendee({ name: '', email: '', eventId: '', status: 'invited' });
    } catch (error) {
      console.error('Error adding attendee:', error);
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Gabim gjatë shtimit të pjesëmarrësit',
        severity: 'error'
      });
    }
  };

  const handleEditAttendee = async () => {
    try {
      await attendeeService.updateAttendee(selectedAttendee.id, selectedAttendee);
      setNotification({
        open: true,
        message: 'Pjesëmarrësi u përditësua me sukses!',
        severity: 'success'
      });
      fetchData();
      setEditAttendeeDialogOpen(false);
      handleMenuClose();
    } catch (error) {
      console.error('Error updating attendee:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë përditësimit të pjesëmarrësit',
        severity: 'error'
      });
    }
  };

  const handleDeleteAttendee = async () => {
    try {
      await attendeeService.deleteAttendee(selectedAttendee.id);
      setNotification({
        open: true,
        message: 'Pjesëmarrësi u fshi me sukses!',
        severity: 'success'
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting attendee:', error);
      setNotification({
        open: true,
        message: 'Gabim gjatë fshirjes së pjesëmarrësit',
        severity: 'error'
      });
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setFilterEvent('');
  };

  const groupAttendeesByEvent = () => {
    const grouped = {};
    filteredAttendees.forEach(attendee => {
      const eventId = attendee.eventId;
      if (!grouped[eventId]) {
        grouped[eventId] = {
          event: attendee.event,
          attendees: []
        };
      }
      grouped[eventId].attendees.push(attendee);
    });
    return grouped;
  };

  const groupedAttendees = groupAttendeesByEvent();

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Pjesëmarrësit
        </Typography>
        {events.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => setAddAttendeeDialogOpen(true)}
            size="large"
          >
            Shto Pjesëmarrës
          </Button>
        )}
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Kërko pjesëmarrës..."
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
                label="Eventi"
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
              >
                <MenuItem value="">Të gjithë eventet</MenuItem>
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.title}
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
                <MenuItem value="">Të gjithë</MenuItem>
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
                startIcon={<SearchIcon />}
              >
                Pastro
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Attendees Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          {filteredAttendees.length} {filteredAttendees.length === 1 ? 'pjesëmarrës' : 'pjesëmarrës'} 
          {searchTerm || filterStatus || filterEvent ? ' (të filtruar)' : ''}
        </Typography>
      </Box>

      {/* Attendees by Event */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Nuk keni krijuar asnjë event
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Para se të shtoni pjesëmarrës, ju duhet të krijoni së paku një event.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/dashboard')}
              size="large"
            >
              Krijo Event të Parë
            </Button>
          </CardContent>
        </Card>
      ) : Object.keys(groupedAttendees).length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {attendees.length === 0 ? 'Nuk keni regjistruar asnjë pjesëmarrës' : 'Nuk u gjetën pjesëmarrës'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {attendees.length === 0 
                ? 'Filloni duke shtuar pjesëmarrësit e parë për eventet tuaja!'
                : 'Provoni të ndryshoni filtrat e kërkimit'
              }
            </Typography>
            {attendees.length === 0 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={() => setAddAttendeeDialogOpen(true)}
              >
                Shto Pjesëmarrës të Parë
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Box>
          {Object.entries(groupedAttendees).map(([eventId, { event, attendees: eventAttendees }]) => (
            <Accordion key={eventId} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <EventIcon />
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {event?.title || 'Event pa titull'}
                  </Typography>
                  <Badge badgeContent={eventAttendees.length} color="primary">
                    <PeopleIcon />
                  </Badge>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Emri</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Statusi</TableCell>
                        <TableCell>Data e regjistrimit</TableCell>
                        <TableCell align="right">Veprime</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventAttendees.map((attendee) => {
                        const statusConfig = getStatusConfig(attendee.status);
                        return (
                          <TableRow key={attendee.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PeopleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                {attendee.name}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                {attendee.email}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={statusConfig.icon}
                                label={statusConfig.label}
                                color={statusConfig.color}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(attendee.createdAt).toLocaleDateString('sq-AL')}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuClick(e, attendee)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          setEditAttendeeDialogOpen(true);
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

      {/* Add Attendee Dialog */}
      <Dialog open={addAttendeeDialogOpen} onClose={() => setAddAttendeeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Shto Pjesëmarrës të Ri</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Emri i plotë"
              variant="outlined"
              fullWidth
              required
              value={newAttendee.name}
              onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={newAttendee.email}
              onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
              sx={{ mb: 3 }}
            />
            
            <TextField
              select
              label="Eventi"
              variant="outlined"
              fullWidth
              required
              value={newAttendee.eventId}
              onChange={(e) => setNewAttendee({ ...newAttendee, eventId: e.target.value })}
              sx={{ mb: 3 }}
              disabled={events.length === 0}
              helperText={events.length === 0 ? "Ju duhet të krijoni një event para se të shtoni pjesëmarrës" : ""}
            >
              {events.length === 0 ? (
                <MenuItem disabled>
                  Nuk ka evente të disponueshme
                </MenuItem>
              ) : (
                events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.title}
                  </MenuItem>
                ))
              )}
            </TextField>
            
            <TextField
              select
              label="Statusi fillestar"
              variant="outlined"
              fullWidth
              value={newAttendee.status}
              onChange={(e) => setNewAttendee({ ...newAttendee, status: e.target.value })}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddAttendeeDialogOpen(false)}>
            Anulo
          </Button>
          {events.length === 0 ? (
            <Button 
              onClick={() => {
                setAddAttendeeDialogOpen(false);
                navigate('/dashboard');
              }} 
              variant="contained"
              color="secondary"
            >
              Krijo Pjesëmarrës të Ri
            </Button>
          ) : (
            <Button 
              onClick={handleAddAttendee} 
              variant="contained"
              disabled={!newAttendee.name || !newAttendee.email || !newAttendee.eventId}
            >
              Shto Pjesëmarrës
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Attendee Dialog */}
      <Dialog open={editAttendeeDialogOpen} onClose={() => setEditAttendeeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ndrysho Pjesëmarrësin</DialogTitle>
        <DialogContent>
          {selectedAttendee && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Emri i plotë"
                variant="outlined"
                fullWidth
                required
                value={selectedAttendee.name}
                onChange={(e) => setSelectedAttendee({ ...selectedAttendee, name: e.target.value })}
                sx={{ mb: 3 }}
              />
              
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                value={selectedAttendee.email}
                onChange={(e) => setSelectedAttendee({ ...selectedAttendee, email: e.target.value })}
                sx={{ mb: 3 }}
              />
              
              <TextField
                select
                label="Statusi"
                variant="outlined"
                fullWidth
                value={selectedAttendee.status}
                onChange={(e) => setSelectedAttendee({ ...selectedAttendee, status: e.target.value })}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditAttendeeDialogOpen(false)}>
            Anulo
          </Button>
          <Button onClick={handleEditAttendee} variant="contained">
            Ruaj Ndryshimet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Konfirmo Fshirjen</DialogTitle>
        <DialogContent>
          <Typography>
            Je i sigurt që dëshiron ta fshish pjesëmarrësin "{selectedAttendee?.name}"? 
            Ky veprim nuk mund të zhbëhet.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Anulo
          </Button>
          <Button onClick={handleDeleteAttendee} color="error" variant="contained">
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

export default Attendees; 