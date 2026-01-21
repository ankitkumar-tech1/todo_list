import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

/**
 * Auth Context
 * 
 * Ye context authentication state manage karta hai:
 * - Current user info
 * - Login/Logout functions
 * - Token management
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize: Check if user is already logged in (localStorage se)
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('flowtasks_token');
      const userData = localStorage.getItem('flowtasks_user');

      if (token && userData) {
        try {
          // Verify token by fetching profile
          const response = await authService.getProfile();
          setUser(response.data);
        } catch (error) {
          // Token invalid - clear storage
          localStorage.removeItem('flowtasks_token');
          localStorage.removeItem('flowtasks_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { token, ...userData } = response.data;

      // Store token and user data
      localStorage.setItem('flowtasks_token', token);
      localStorage.setItem('flowtasks_user', JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  /**
   * Register function
   */
  const register = async (name, email, password) => {
    try {
      const response = await authService.register({ name, email, password });
      const { token, ...userData } = response.data;

      // Store token and user data
      localStorage.setItem('flowtasks_token', token);
      localStorage.setItem('flowtasks_user', JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    localStorage.removeItem('flowtasks_token');
    localStorage.removeItem('flowtasks_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
