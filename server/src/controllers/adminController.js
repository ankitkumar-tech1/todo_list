import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * Get all users
 * GET /api/admin/users
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort('-createdAt');
        res.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

/**
 * Delete user
 * DELETE /api/admin/users/:id
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ success: true, message: 'User removed' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

/**
 * Admin Reset User Password
 * PUT /api/admin/users/:id/password
 */
export const adminUpdateUserPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Assign directly, pre-save hook will handle hashing
        user.password = password;
        await user.save();

        res.json({
            success: true,
            message: 'User password updated successfully',
        });
    } catch (error) {
        console.error('Error updating user password:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};
