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

// 🔥 FINAL CORS CONFIG (PRODUCTION SAFE)
app.use(cors({
  origin: [
    process.env.CLIENT_URL,                     // Render env
    'https://flowtask-eta.vercel.app',           // Vercel main domain
    'https://flowtask-ageuq4rfc-ankitkumar2431967-1032s-projects.vercel.app', // Vercel preview
    'http://localhost:5173'                      // Local dev
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// 🔴 PRE-FLIGHT (OPTIONS) FIX — THIS WAS MISSING
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROOT ROUTE (debug)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running 🚀',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running! 🚀',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (last)
app.use(errorHandler);

export default app;
