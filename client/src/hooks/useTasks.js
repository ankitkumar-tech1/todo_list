import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';

/**
 * useTasks Hook
 * 
 * Ye custom hook tasks ke liye state management handle karta hai:
 * - Tasks list
 * - Loading state
 * - Error handling
 * - CRUD operations with optimistic updates
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all tasks
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initial load: Fetch tasks
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Create new task (with optimistic update)
   */
  const createTask = async (taskData) => {
    try {
      // Optimistic update: Pehle UI mein add karo
      const tempTask = {
        _id: `temp-${Date.now()}`,
        ...taskData,
        completed: false,
        createdAt: new Date(),
      };
      setTasks((prev) => [tempTask, ...prev]);

      // API call
      const response = await taskService.createTask(taskData);
      
      // Replace temp task with real task
      setTasks((prev) =>
        prev.map((task) =>
          task._id === tempTask._id ? response.data : task
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      // Rollback: Remove temp task
      setTasks((prev) => prev.filter((task) => task._id !== tempTask._id));
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create task',
      };
    }
  };

  /**
   * Update task (with optimistic update)
   */
  const updateTask = async (taskId, taskData) => {
    let originalTasks = [...tasks];
    try {
      // Optimistic update: Pehle UI mein update karo
      setTasks((prev) => {
        originalTasks = [...prev];
        return prev.map((task) =>
          task._id === taskId ? { ...task, ...taskData } : task
        );
      });

      // API call
      const response = await taskService.updateTask(taskId, taskData);
      
      // Replace with server response
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? response.data : task
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      // Rollback
      setTasks(originalTasks);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update task',
      };
    }
  };

  /**
   * Delete task (with optimistic update)
   */
  const deleteTask = async (taskId) => {
    let deletedTask = tasks.find((task) => task._id === taskId);
    try {
      // Optimistic update: Pehle UI se remove karo
      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      // API call
      await taskService.deleteTask(taskId);

      return { success: true };
    } catch (err) {
      // Rollback: Add task back
      if (deletedTask) {
        setTasks((prev) => [...prev, deletedTask].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ));
      }
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to delete task',
      };
    }
  };

  /**
   * Toggle task completion
   */
  const toggleComplete = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    return await updateTask(taskId, { completed: !task.completed });
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
};
