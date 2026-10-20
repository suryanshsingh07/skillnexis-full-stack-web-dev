import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillnexis_todo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('skillnexis_todo_token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const data = await authService.getMe();
          setUser(data.user);
          localStorage.setItem('skillnexis_todo_user', JSON.stringify(data.user));
        } catch (err) {
          console.error('Session expired or invalid:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await authService.login({ email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('skillnexis_todo_token', data.token);
      localStorage.setItem('skillnexis_todo_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Authentication failed. Please check credentials.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const data = await authService.register({ name, email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('skillnexis_todo_token', data.token);
      localStorage.setItem('skillnexis_todo_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillnexis_todo_token');
    localStorage.removeItem('skillnexis_todo_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, login, register, logout, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
