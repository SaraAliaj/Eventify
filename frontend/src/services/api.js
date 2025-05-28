import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Added auth token to request');
    }
    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API response success:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: (credentials) => {
    console.log('Login request:', credentials);
    return api.post('/auth/login', credentials);
  },
  register: (userData) => {
    console.log('Register request:', userData);
    return api.post('/auth/register', userData);
  },
  logout: () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// User services
export const userService = {
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (userData) => api.put('/users/profile', userData),
};

// Event services
export const eventService = {
  getEvents: () => api.get('/events'),
  getEventById: (id) => api.get(`/events/${id}`),
  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
};

// Attendee services
export const attendeeService = {
  getAttendees: () => api.get('/attendees'),
  getEventAttendees: (eventId) => api.get(`/attendees/event/${eventId}`),
  createAttendee: (attendeeData) => api.post('/attendees', attendeeData),
  updateAttendee: (id, attendeeData) => api.put(`/attendees/${id}`, attendeeData),
  deleteAttendee: (id) => api.delete(`/attendees/${id}`),
};

export default api; 