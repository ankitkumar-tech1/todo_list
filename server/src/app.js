import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();

/**
 * Express App Configuration
 * 
 * Ye main Express app setup hai - middleware, routes, error handling sab yahan hai.
 */

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route (testing ke liye)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running! 🚀',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler (agar koi route match nahi hua)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware (last mein - saare errors yahan handle honge)
app.use(errorHandler);

export default app;
