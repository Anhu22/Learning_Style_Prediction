// User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    schoolname: {
      type: String,
      required: true,
      trim: true,
    },
    rollno: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Score related fields merged from Result model
    readScore: {
      type: Number,
      default: 0,
    },
    visualScore: {
      type: Number,
      default: 0,
    },
    audioScore: {
      type: Number,
      default: 0,
    },
    kinestheticScore: {
      type: Number,
      default: 0,
    },
    predictedStyle: {
      type: String,
      default: '',
    },
    readTime: {
      type: Number,
      default: 0,
    },
    visualTime: {
      type: Number,
      default: 0,
    },
    audioTime: {
      type: Number,
      default: 0,
    },
    kinestheticTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ Compound index: rollno + schoolname must be unique together
userSchema.index({ rollno: 1, schoolname: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

export default User;
