import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// 🔥 FINAL CORS (ALLOW ALL – DEBUG MODE)
app.use(cors({
  origin: true,
  credentials: true
}));

// 🔥 Preflight
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server running' });
});

app.use(errorHandler);

export default app;
