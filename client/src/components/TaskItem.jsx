import { motion } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../context/ToastContext';

/**
 * TaskItem Component
 * 
 * Ye component ek individual task card render karta hai:
 * - Checkbox (complete/incomplete toggle)
 * - Title & description
 * - Priority badge
 * - Due date
 * - Delete button
 * - Smooth animations (hover, complete, delete)
 */
const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask } = useTasks();
  const { showToast } = useToast();

  /**
   * Handle complete toggle
   */
  const handleToggle = async () => {
    const result = await toggleComplete(task._id);
    if (result.success) {
      showToast(
        task.completed ? 'Task marked as incomplete' : 'Task completed! 🎉',
        'success'
      );
    } else {
      showToast(result.message || 'Failed to update task', 'error');
    }
  };

  /**
   * Handle delete
   */
  const handleDelete = async () => {
    const result = await deleteTask(task._id);
    if (result.success) {
      showToast('Task deleted', 'success');
    } else {
      showToast(result.message || 'Failed to delete task', 'error');
    }
  };

  /**
   * Format due date
   */
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  /**
   * Priority colors
   */
  const priorityColors = {
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="glass-panel p-4 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          className={`
            flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center
            transition-colors duration-200
            ${
              task.completed
                ? 'bg-accent border-accent'
                : 'border-gray-400 hover:border-accent'
            }
          `}
        >
          {task.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </motion.button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`
              font-semibold text-foreground mb-1 transition-all duration-200
              ${task.completed ? 'line-through opacity-60' : ''}
            `}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`
                text-sm text-muted mb-2 transition-all duration-200
                ${task.completed ? 'line-through opacity-50' : ''}
              `}
            >
              {task.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {/* Priority Badge */}
            <span
              className={`
                px-2 py-0.5 rounded-full text-xs font-medium border
                ${priorityColors[task.priority] || priorityColors.Medium}
              `}
            >
              {task.priority}
            </span>

            {/* Due Date */}
            {task.dueDate && (
              <span className="text-xs text-muted">
                {formatDueDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="flex-shrink-0 text-muted hover:text-red-400 transition-colors p-1"
          aria-label="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
