import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Task Routes
 * 
 * Saare routes protected hain (protect middleware) - matlab JWT token required hai.
 * 
 * GET    /api/tasks - Get all tasks for logged-in user
 * GET    /api/tasks/:id - Get single task
 * POST   /api/tasks - Create new task
 * PUT    /api/tasks/:id - Update task
 * DELETE /api/tasks/:id - Delete task
 */

// Saare routes pe protect middleware lagao (JWT auth required)
router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
