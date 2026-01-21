import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Auth Routes
 * 
 * POST /api/auth/register - Register new user
 * POST /api/auth/login - Login user
 * GET /api/auth/profile - Get current user profile (protected)
 */
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile); // protect middleware = JWT required

export default router;
