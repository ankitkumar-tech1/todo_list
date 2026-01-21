import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB Connection Setup
 * 
 * Ye function MongoDB Atlas ya local MongoDB se connect karta hai.
 * Connection string .env file mein MONGODB_URI se aata hai.
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'MONGODB_URI is missing. Create server/.env and set MONGODB_URI=<your MongoDB connection string>.'
      );
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Modern MongoDB driver options (Mongoose 8+)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Server band kar do agar DB connect nahi hua
  }
};

export default connectDB;
