import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ThemeToggle } from '../ui/ThemeToggle';

/**
 * LoginForm Component
 * 
 * Ye component login/register form render karta hai:
 * - Toggle between Login and Register
 * - Form validation
 * - Smooth animations
 */
const LoginForm = () => {
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.email.trim()) {
      showToast('Please enter your email', 'error');
      setLoading(false);
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      showToast('Please enter your password', 'error');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      setLoading(false);
      return;
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      if (!formData.name.trim()) {
        showToast('Please enter your name', 'error');
        setLoading(false);
        return;
      }
      result = await register(formData.name, formData.email, formData.password);
    }

    setLoading(false);

    if (result.success) {
      showToast(
        isLogin ? 'Login successful! 🎉' : 'Registration successful! 🎉',
        'success'
      );
    } else {
      showToast(result.message || 'Authentication failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),_transparent_55%)]" />

      {/* Theme Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-panel w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-glass-lg relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accentSoft text-accent mb-4">
            <span className="text-3xl font-black">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">FlowTasks</h1>
          <p className="text-muted">Premium Todo List App</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-6 p-1 bg-surface/30 rounded-lg border border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLogin(true)}
            className={`
              flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isLogin
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-foreground'
              }
            `}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLogin(false)}
            className={`
              flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                !isLogin
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-foreground'
              }
            `}
          >
            Register
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (only for register) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                required={!isLogin}
              />
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
              minLength={6}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full px-4 py-3 bg-accent rounded-lg text-white font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading
              ? 'Please wait...'
              : isLogin
              ? 'Login'
              : 'Create Account'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
