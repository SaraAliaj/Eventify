import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar';
import './Home.css';

const Home = () => {
  return (
    <Grid container className="home-container" style={{ minHeight: '100vh', height: '100vh', width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box', flexWrap: 'nowrap' }}>
      <Grid item style={{ width: 320, minWidth: 320, maxWidth: 320, padding: 0, margin: 0, boxSizing: 'border-box', height: '100vh', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', flex: '0 0 320px' }}>
        <Sidebar />
      </Grid>
      <Grid item style={{ padding: 0, margin: 0, boxSizing: 'border-box', height: '100vh', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(120deg, #f2f2ed 60%, #e3e6f3 100%)', width: 'calc(100vw - 320px)' }}>
        <Box className="content-container" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 64, minHeight: 64, maxHeight: 64, px: 0, margin: 0, background: 'rgba(255,255,255,0.85)', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 2, width: '100%' }}>
            <Button component={Link} to="/" color="primary" sx={{ color: '#13294B', fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.3rem' }, mx: 2 }}>KRYEFAQJA</Button>
            <Button component={Link} to="/about" color="primary" sx={{ color: '#13294B', fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.3rem' }, mx: 2 }}>RRETH NESH</Button>
            <Button component={Link} to="/contact" color="primary" sx={{ color: '#13294B', fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.3rem' }, mx: 2 }}>KONTAKT</Button>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 64px)', minHeight: 'calc(100vh - 64px)', maxHeight: 'calc(100vh - 64px)', overflow: 'hidden', px: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
              <Box sx={{ width: 70, height: 70, mb: 1, position: 'relative' }}>
                <svg width="70" height="70" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="45,5 85,27.5 85,62.5 45,85 5,62.5 5,27.5" fill="#13294B" stroke="#A0AEC1" strokeWidth="4"/>
                </svg>
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, textShadow: '0 2px 8px #13294B', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>Eventify</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center', mb: 2, px: 4 }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem', lg: '4rem' }, background: 'linear-gradient(45deg, #13294B 30%, #A0AEC1 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
                Eventify - Bën çdo rast special
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, color: '#13294B', fontWeight: 300, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' } }}>
                Planifiko, fto dhe festoni me lehtësi.
              </Typography>
              <Box sx={{ my: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 3 }}>
                <Button variant="contained" size="large" component={Link} to="/register" className="hover-glow" sx={{ px: 5, py: 1.5, borderRadius: '30px', fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.2rem' }, backgroundColor: '#13294B', boxShadow: '0 4px 14px 0 rgba(19, 41, 75, 0.4)', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#1d3b66', boxShadow: '0 6px 20px rgba(19, 41, 75, 0.6)' } }}>
                  REGJISTROHU
                </Button>
                <Button variant="outlined" size="large" component={Link} to="/login" className="hover-glow" sx={{ px: 5, py: 1.5, borderRadius: '30px', fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.2rem' }, borderWidth: '2px', borderColor: '#13294B', color: '#13294B', transition: 'all 0.3s ease', '&:hover': { borderWidth: '2px', borderColor: '#13294B', backgroundColor: 'rgba(19, 41, 75, 0.04)' } }}>
                  HYRJE
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
              <Paper elevation={2} className="feature-card" sx={{ p: 3, borderRadius: '12px', background: '#F2F2ED', width: { xs: '90%', sm: '180px' }, borderTop: '4px solid #13294B', minWidth: 150 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#13294B', fontSize: { xs: '1rem', sm: '1.1rem' } }}>Planifiko Evente</Typography>
                <Typography variant="body2" sx={{ color: '#13294B', fontSize: { xs: '0.95rem', sm: '1rem' } }}>Krijo dhe organizo evente me lehtësi</Typography>
              </Paper>
              <Paper elevation={2} className="feature-card" sx={{ p: 3, borderRadius: '12px', background: '#F2F2ED', width: { xs: '90%', sm: '180px' }, borderTop: '4px solid #A0AEC1', minWidth: 150 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#13294B', fontSize: { xs: '1rem', sm: '1.1rem' } }}>Dërgo Ftesa</Typography>
                <Typography variant="body2" sx={{ color: '#13294B', fontSize: { xs: '0.95rem', sm: '1rem' } }}>Fto të ftuarit me shabllone të bukura</Typography>
              </Paper>
              <Paper elevation={2} className="feature-card" sx={{ p: 3, borderRadius: '12px', background: '#F2F2ED', width: { xs: '90%', sm: '180px' }, borderTop: '4px solid #D1C9B8', minWidth: 150 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#13294B', fontSize: { xs: '1rem', sm: '1.1rem' } }}>Festoni</Typography>
                <Typography variant="body2" sx={{ color: '#13294B', fontSize: { xs: '0.95rem', sm: '1rem' } }}>Shijoni rastet tuaja të veçanta</Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home; 