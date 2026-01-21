import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Server Entry Point
 * 
 * Ye file server start karti hai - MongoDB connect karke Express server listen karti hai.
 */

const PORT = process.env.PORT || 5000;

// MongoDB connect karo
connectDB();

// Server start karo
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
