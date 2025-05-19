import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button, Divider, LinearProgress, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTip, setCurrentTip] = useState(0);
  const [currentDate] = useState(new Date());
  
  const tipsList = [
    { 
      icon: <TipsAndUpdatesIcon />, 
      title: "Këshillë", 
      text: "Përdorni kalendarin për planifikim më efektiv" 
    },
    { 
      icon: <StarIcon />, 
      title: "E re", 
      text: "Përdorni funksionalitetin e njoftimeve për organizim më të mirë" 
    },
    { 
      icon: <TimelineIcon />, 
      title: "Statistikë", 
      text: "70% e përdoruesve organizojnë evente më shpejt me Eventify" 
    }
  ];
  
  // Mock event stats data
  const eventStats = [
    { label: "Evente të ardhshme", value: 5, icon: <EventIcon />, color: "#A0AEC1" },
    { label: "Pjesëmarrje", value: 24, icon: <GroupsIcon />, color: "#D1C9B8" },
    { label: "Të konfirmuara", value: 18, icon: <CheckCircleOutlineIcon />, color: "#F2F2ED" }
  ];
  
  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Mbledhje Ekipi",
      date: "24 Qer",
      time: "14:00 - 15:30",
      location: "Salla e Konferencave"
    },
    {
      id: 2,
      title: "Trajnimi Online",
      date: "26 Qer",
      time: "10:00 - 12:00",
      location: "Platforma Zoom"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tipsList.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tipsList.length]);
  
  // Generate calendar days for mini calendar
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get current day
    const today = new Date().getDate();
    
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today && currentDate.getMonth() === new Date().getMonth();
      const hasEvent = [5, 12, 18, 24, 26].includes(i); // Mock days with events
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };
  
  const menuItems = [
    { 
      text: 'Paneli', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      onClick: () => navigate('/dashboard')
    },
    { 
      text: 'Eventet e Mia', 
      icon: <EventIcon />, 
      path: '/events',
      onClick: () => navigate('/events') 
    },
    { 
      text: 'Kalendari', 
      icon: <CalendarMonthIcon />, 
      path: '/calendar',
      onClick: () => navigate('/calendar')
    },
    { 
      text: 'Pjesëmarrësit', 
      icon: <PeopleIcon />, 
      path: '/attendees',
      onClick: () => navigate('/attendees')
    },
    { 
      text: 'Njoftimet', 
      icon: <NotificationsActiveIcon />, 
      path: '/notifications',
      onClick: () => navigate('/notifications')
    },
    { 
      text: 'Cilësimet', 
      icon: <SettingsIcon />, 
      path: '/settings',
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <Box className="sidebar">
      <div className="dot-pattern"></div>
      <div className="sidebar-decoration"></div>
      <div className="sidebar-decoration-top"></div>
      
      <Box className="sidebar-header">
        <Typography variant="h5" className="app-title">
          Eventify
        </Typography>
      </Box>
      
      <Divider className="sidebar-divider" />
      
      <List component="nav" className="sidebar-nav">
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={item.onClick}
            className={location.pathname === item.path ? "sidebar-item-active" : "sidebar-item"}
          >
            <ListItemIcon className="sidebar-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Box className="sidebar-footer">
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" className="sidebar-footer-text">
            Menaxhimi i Eventeve Bërë i Thjeshtë
          </Typography>
          <Typography variant="caption" className="sidebar-footer-text">
            Krijo, Menaxho dhe Gjurmo eventet me platformën tonë
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar; 