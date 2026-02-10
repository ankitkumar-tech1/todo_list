import express from 'express';
import {
    getAllUsers,
    deleteUser,
    adminUpdateUserPassword,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect, admin);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/password', adminUpdateUserPassword);

export default router;
