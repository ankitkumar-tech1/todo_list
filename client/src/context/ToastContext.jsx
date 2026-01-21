import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Toast Context
 * 
 * Ye context toast notifications handle karta hai:
 * - Success/Error messages
 * - Auto-dismiss after 3 seconds
 * - Smooth animations
 */
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  /**
   * Remove toast manually
   */
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`
                pointer-events-auto px-4 py-3 rounded-lg shadow-lg backdrop-blur-md
                ${
                  toast.type === 'success'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-red-500/90 text-white'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                <span className="text-sm font-medium">{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-2 text-white/80 hover:text-white"
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
