import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * 
 * Ye middleware har protected route pe use hoga.
 * Request headers se JWT token read karega, verify karega, aur user info attach karega.
 */
export const protect = async (req, res, next) => {
  let token;

  // Token ko Authorization header se read karo
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // "Bearer " ko remove karo, sirf token lo
      token = req.headers.authorization.split(' ')[1];

      // Token ko verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ko database se fetch karo (password exclude karke)
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      next(); // Next middleware ya controller pe jao
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};
