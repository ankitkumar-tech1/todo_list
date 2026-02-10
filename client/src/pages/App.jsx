import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import TaskFilters from '../components/TaskFilters';
import LoginForm from '../components/LoginForm';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const App = () => {
  const { isAuthenticated, user, loading: authLoading, logout } = useAuth();
  const { tasks } = useTasks();
  const [filter, setFilter] = useState('all');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Calculate stats
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-bg text-foreground transition-colors duration-300">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),_transparent_55%)]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 pb-10 pt-3 sm:px-6 md:px-10 lg:px-16">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accentSoft text-accent">
              <span className="text-xl font-black">✓</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                  FlowTasks
                </h1>
                <span className="rounded-full bg-accentSoft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  Premium
                </span>
              </div>
              <p className="text-[11px] text-muted sm:text-xs">
                Welcome back, {user?.name || 'User'}! 👋
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              Logout
            </motion.button>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <motion.main
          className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 lg:flex-row"
          initial="hidden"
          animate="enter"
          variants={pageVariants}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {/* Left Column - Task Board */}
          <section className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Tasks</h2>
              <p className="text-muted text-sm mb-4">
                Stay organized and get things done
              </p>
            </div>

            {/* Filters */}
            <TaskFilters activeFilter={filter} onFilterChange={setFilter} />

            {/* Add Task Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddFormOpen(true)}
              className="w-full glass-panel p-4 rounded-xl border border-foreground/10 hover:border-accent/50 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="font-medium">Add New Task</span>
            </motion.button>

            {/* Task List */}
            <div className="mt-4">
              <TaskList filter={filter} />
            </div>
          </section>

          {/* Right Column - Info Panel */}
          <aside className="lg:w-80 space-y-4">
            <div className="glass-panel p-6 rounded-xl border border-foreground/10">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Total Tasks</span>
                  <span className="font-semibold">{totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Active</span>
                  <span className="font-semibold text-yellow-400">{activeTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Completed</span>
                  <span className="font-semibold text-green-400">{completedTasks}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-foreground/10">
              <h3 className="text-lg font-semibold mb-2">Tips</h3>
              <p className="text-sm text-muted">
                Use filters to organize your tasks. Mark tasks as complete to
                track your progress!
              </p>
            </div>
          </aside>
        </motion.main>
      </div>

      {/* Add Task Form Modal */}
      <AddTaskForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
      />
    </div>
  );
};

export default App;
