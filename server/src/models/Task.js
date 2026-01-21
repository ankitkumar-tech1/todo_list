import mongoose from 'mongoose';

/**
 * Task Model Schema
 * 
 * Ye schema todo tasks ke liye hai.
 * Har task ek user se belong karta hai (user reference).
 */
const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // User model se reference
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt automatically add hoga
  }
);

/**
 * Index: User + createdAt for faster queries
 * 
 * Jab bhi user ke tasks fetch karenge, ye index fast results dega.
 */
taskSchema.index({ user: 1, createdAt: -1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
