import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
