require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5001;

// Connect to MongoDB and start HTTP listener
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] To-Do REST API running on port ${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
      console.log(`[Server] Tasks endpoint: http://localhost:${PORT}/api/tasks`);
    });
  })
  .catch((err) => {
    console.error('[Server Fatal] Could not connect to database, exiting.', err.message);
    process.exit(1);
  });
