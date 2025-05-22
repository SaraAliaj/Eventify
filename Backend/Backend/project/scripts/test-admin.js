const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAdminRoutes() {
  try {
    console.log('Testing Admin API...');
    
    // Test API connection
    console.log('\n1. Testing Admin API connection...');
    const testResponse = await axios.get(`${API_URL}/admin/test`);
    console.log('Admin API test successful:', testResponse.data);
    
    // Login as admin to get token
    console.log('\n2. Logging in as admin...');
    const adminCredentials = {
      email: 'admin@eventify.com',
      password: 'admin123'
    };
    
    const loginResponse = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    console.log('Admin login successful');
    
    const { token } = loginResponse.data;
    console.log('Admin token:', token ? `${token.substring(0, 15)}...` : 'No token');
    
    // Try to get users list with admin token
    console.log('\n3. Testing admin users endpoint...');
    const usersResponse = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Users API response successful. Found users:', usersResponse.data.length);
    
    // Try to get events list with admin token
    console.log('\n4. Testing admin events endpoint...');
    const eventsResponse = await axios.get(`${API_URL}/admin/events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Events API response successful. Found events:', eventsResponse.data.length);
    
    console.log('\nAll admin tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAdminRoutes(); 