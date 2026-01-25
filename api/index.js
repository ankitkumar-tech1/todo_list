import app from './server/src/app.js';
import connectDB from './server/src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to DB (handles serverless cold starts)
connectDB();

export default app;