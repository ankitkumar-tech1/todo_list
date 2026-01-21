import { motion } from 'framer-motion';

/**
 * TaskFilters Component
 * 
 * Ye component task filters render karta hai:
 * - All / Active / Completed tabs
 * - Smooth active state animation
 */
const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 p-1 bg-surface/30 rounded-lg border border-white/10">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`
            relative flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              activeFilter === filter.id
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
            }
          `}
        >
          {filter.label}
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute inset-0 bg-accent/20 rounded-md border border-accent/50"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default TaskFilters;
