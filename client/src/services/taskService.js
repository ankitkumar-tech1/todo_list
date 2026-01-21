import api from './api.js';

/**
 * Task Service
 * 
 * Ye service task-related API calls handle karti hai:
 * - Get all tasks
 * - Get single task
 * - Create task
 * - Update task
 * - Delete task
 */

export const taskService = {
  /**
   * Get all tasks for logged-in user
   */
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Get single task by ID
   */
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  /**
   * Create new task
   */
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update task
   */
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  /**
   * Delete task
   */
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};
