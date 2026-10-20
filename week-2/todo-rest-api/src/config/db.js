const mongoose = require('mongoose');

const connectDB = async (uri) => {
  const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillnexis_todo_db';

  try {
    const conn = await mongoose.connect(connectionUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error(`[Database Error] Failed to disconnect: ${error.message}`);
  }
};

module.exports = { connectDB, disconnectDB };
