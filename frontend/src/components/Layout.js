import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: 280, flexShrink: 0 }}>
        <Sidebar />
      </Box>
      
      {/* Main content area */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3, 
        backgroundColor: '#F2F2ED',
        minHeight: '100vh'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 