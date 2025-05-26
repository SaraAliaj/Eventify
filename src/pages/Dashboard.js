import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const dashboardItems = [
    { title: 'Events', path: '/events', description: 'Manage your events' },
    { title: 'Calendar', path: '/calendar', description: 'View event calendar' },
    { title: 'Attendees', path: '/attendees', description: 'Manage attendees' },
    { title: 'Notifications', path: '/notifications', description: 'View notifications' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard; 