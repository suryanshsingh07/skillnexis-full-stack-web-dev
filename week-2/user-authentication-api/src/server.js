require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5002;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] User Authentication API running on port ${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
      console.log(`[Server] Auth routes: http://localhost:${PORT}/api/auth/register | login | me`);
    });
  })
  .catch((err) => {
    console.error('[Server Fatal] Could not connect to database, exiting.', err.message);
    process.exit(1);
  });
