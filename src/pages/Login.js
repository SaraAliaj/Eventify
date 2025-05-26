import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function Login() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login; 