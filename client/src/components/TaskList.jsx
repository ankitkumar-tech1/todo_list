import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { useTasks } from '../hooks/useTasks';

/**
 * TaskList Component
 * 
 * Ye component tasks list render karta hai:
 * - Loading skeleton
 * - Empty state
 * - Filtered tasks with animations
 * - Smooth add/remove animations
 */
const TaskList = ({ filter = 'all' }) => {
  const { tasks, loading } = useTasks();

  /**
   * Filter tasks based on filter type
   */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  /**
   * Loading skeleton
   */
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-4 rounded-xl h-20 animate-pulse"
          />
        ))}
      </div>
    );
  }

  /**
   * Empty state
   */
  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {filter === 'completed' ? '🎉' : filter === 'active' ? '✨' : '📝'}
        </motion.div>
        <p className="text-muted text-lg">
          {filter === 'completed'
            ? 'No completed tasks yet'
            : filter === 'active'
            ? 'No active tasks. Great job! 🎊'
            : 'No tasks yet. Start by adding one!'}
        </p>
      </motion.div>
    );
  }

  /**
   * Task list with animations
   */
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
