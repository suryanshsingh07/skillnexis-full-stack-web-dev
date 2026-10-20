const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100kb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'SkillNexis To-Do List REST API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// 404 & Centralized Error Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
