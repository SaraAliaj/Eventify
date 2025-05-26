import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Calendar() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No events scheduled for today
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Calendar; 