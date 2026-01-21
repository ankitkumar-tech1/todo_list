import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env');
      return;
    }

    console.log('🔄 Testing MongoDB connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');

  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Check your MONGODB_URI in .env file');
    console.error('💡 Make sure your MongoDB Atlas password is correct');
  }
};

testConnection();