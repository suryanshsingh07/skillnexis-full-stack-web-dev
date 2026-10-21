require('dotenv').config();
const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`[NexisStore Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    const shutdown = async (signal) => {
      console.log(`\n[${signal} Received] Gracefully shutting down server...`);
      server.close(async () => {
        await disconnectDB();
        console.log('[NexisStore Server] Process terminated safely.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error(`[Fatal Startup Error]: ${error.message}`);
    process.exit(1);
  }
};

startServer();
