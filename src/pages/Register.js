import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function Register() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register; 