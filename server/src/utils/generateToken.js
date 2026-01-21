import jwt from 'jsonwebtoken';

/**
 * JWT Token Generator
 * 
 * Ye function user ID se JWT token generate karta hai.
 * Token expire hoga 30 days mein (production mein thoda kam rakho).
 */
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
