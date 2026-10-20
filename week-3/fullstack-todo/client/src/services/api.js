import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Attach JWT Bearer token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillnexis_todo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('skillnexis_todo_token');
      localStorage.removeItem('skillnexis_todo_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  }
};

export const taskService = {
  getTasks: async (params = {}) => {
    const res = await api.get('/todos', { params });
    return res.data;
  },
  getTaskById: async (id) => {
    const res = await api.get(`/todos/${id}`);
    return res.data;
  },
  createTask: async (taskData) => {
    const res = await api.post('/todos', taskData);
    return res.data;
  },
  updateTask: async (id, taskData) => {
    const res = await api.patch(`/todos/${id}`, taskData);
    return res.data;
  },
  deleteTask: async (id) => {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
  }
};

export default api;
