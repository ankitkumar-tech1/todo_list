import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="ripple inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm transition-colors hover:border-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        className="relative flex h-5 w-10 items-center rounded-full bg-slate-900/80 px-1"
      >
        <motion.div
          layout
          className="absolute inset-y-0 flex items-center px-1 text-[10px] font-semibold text-muted"
        >
          <span className="mr-auto">☀</span>
          <span className="ml-auto">☾</span>
        </motion.div>
        <motion.div
          layout
          className="h-4 w-4 rounded-full bg-accent shadow-md shadow-accent/30"
        />
      </motion.div>
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'} mode</span>
    </motion.button>
  );
};

