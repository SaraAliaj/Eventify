const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    console.log('Testing Authentication API...');
    
    // Test API connection
    console.log('\n1. Testing API connection...');
    const testResponse = await axios.get(`${API_URL}/auth/test`);
    console.log('API test successful:', testResponse.data);
    
    // Test registration
    console.log('\n2. Testing user registration...');
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`, // unique email using timestamp
      password: 'password123',
      role: 'user'
    };
    
    console.log('Registering user:', testUser);
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('Registration successful:', registerResponse.data);
    
    // Extract token and user from registration response
    const { token, user } = registerResponse.data;
    console.log('Registered user:', user);
    
    // Test login
    console.log('\n3. Testing user login...');
    const loginCredentials = {
      email: testUser.email,
      password: testUser.password
    };
    
    console.log('Logging in with:', loginCredentials);
    const loginResponse = await axios.post(`${API_URL}/auth/login`, loginCredentials);
    console.log('Login successful:', loginResponse.data);
    
    // Test authentication with token
    console.log('\n4. Testing authentication with token...');
    const authResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Authentication successful:', authResponse.data);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAuth(); 