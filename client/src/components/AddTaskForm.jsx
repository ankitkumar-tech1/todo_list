import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../context/ToastContext';

/**
 * AddTaskForm Component
 * 
 * Ye component new task add karne ke liye form hai:
 * - Title (required)
 * - Description (optional)
 * - Priority selector
 * - Due date picker
 * - Smooth open/close animation
 */
const AddTaskForm = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);

  /**
   * Handle form input change
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

    if (!formData.title.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    setLoading(true);

    const result = await createTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null,
    });

    setLoading(false);

    if (result.success) {
      showToast('Task added successfully! 🎉', 'success');
      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
      });
      onClose();
    } else {
      showToast(result.message || 'Failed to add task', 'error');
    }
  };

  /**
   * Handle close
   */
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-glass-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Add New Task
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add details..."
                    rows="3"
                    className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  />
                </div>

                {/* Priority & Due Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 bg-surface/50 border border-white/10 rounded-lg text-foreground hover:bg-surface transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-accent rounded-lg text-white font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Adding...' : 'Add Task'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskForm;
