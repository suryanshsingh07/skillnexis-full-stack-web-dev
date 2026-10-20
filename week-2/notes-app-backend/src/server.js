require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5003;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] Notes App Backend running on port ${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
      console.log(`[Server] Auth endpoints: http://localhost:${PORT}/api/auth/register | login`);
      console.log(`[Server] Notes endpoints: http://localhost:${PORT}/api/notes`);
    });
  })
  .catch((err) => {
    console.error('[Server Fatal] Could not connect to database, exiting.', err.message);
    process.exit(1);
  });
