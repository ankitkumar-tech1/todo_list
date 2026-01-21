import api from './api.js';

/**
 * Auth Service
 * 
 * Ye service authentication-related API calls handle karti hai:
 * - Register user
 * - Login user
 * - Get current user profile
 */

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};
