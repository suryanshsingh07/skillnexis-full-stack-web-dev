import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexis_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to format errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';

    if (error.response?.status === 401) {
      // If unauthorized due to token expiration, handle cleanly
      if (message.toLowerCase().includes('expired') || message.toLowerCase().includes('session')) {
        localStorage.removeItem('nexis_token');
        localStorage.removeItem('nexis_user');
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
