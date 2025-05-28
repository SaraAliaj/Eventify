import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = authService.getCurrentUser();
      
      if (token && storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response.data;

      if (!user || !user.role) {
        throw new Error('Invalid user data received');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Smart redirect based on role and previous location
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Ndodhi një gabim gjatë hyrjes'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;

      if (!user || !user.role) {
        throw new Error('Invalid user data received');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Smart redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Ndodhi një gabim gjatë regjistrimit'
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login?redirect=true');
  };

  const checkRole = (requiredRole) => {
    if (!user) return false;
    if (requiredRole === 'admin') return user.role === 'admin';
    if (requiredRole === 'user') return user.role === 'user';
    return true;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 