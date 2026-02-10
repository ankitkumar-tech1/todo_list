/**
 * Admin Middleware
 * 
 * Check karta hai ki authenticated user ka role 'admin' hai ya nahi.
 * Isko 'protect' middleware ke baad use karna chahiye.
 */
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Not authorized as an admin',
        });
    }
};
