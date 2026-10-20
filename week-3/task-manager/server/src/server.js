require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[Server] Task Manager API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('[Server Error]:', error.message);
    process.exit(1);
  }
};

startServer();
