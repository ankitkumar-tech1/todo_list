import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Model Schema
 * 
 * Ye schema user authentication ke liye hai.
 * Email unique hai, password hash karke store hota hai.
 */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Password by default query mein nahi aayega (security)
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt automatically add hoga
  }
);

/**
 * Pre-save Hook: Password ko hash karo before saving
 * 
 * Jab bhi user create/update hoga, password ko bcrypt se hash karke store karo.
 */
userSchema.pre('save', async function (next) {
  // Agar password modify nahi hua hai, skip karo
  if (!this.isModified('password')) {
    next();
    return;
  }

  // Password ko hash karo (10 rounds = salt rounds)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance Method: Password compare karo
 * 
 * Ye method login ke time use hoga - plain password vs hashed password compare karega.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
