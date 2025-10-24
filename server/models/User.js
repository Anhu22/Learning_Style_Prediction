const mongoose = require('mongoose');

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

    // --- Quiz scores ---
    readScore: { type: Number, default: 0 },
    visualScore: { type: Number, default: 0 },
    audioScore: { type: Number, default: 0 },
    kinestheticScore: { type: Number, default: 0 },

    // --- Predicted learning style ---
    predictedStyle: { type: String, default: '' },

    // --- Time tracking ---
    readTime: { type: Number, default: 0 },
    visualTime: { type: Number, default: 0 },
    audioTime: { type: Number, default: 0 },
    kinestheticTime: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Ensure rollno is unique only within each school
userSchema.index({ schoolname: 1, rollno: 1 }, { unique: true });

// Optional: remove the old index if it exists
// mongoose.connection.collection('users').dropIndex('rollno_1'); // uncomment once to clean up

const User = mongoose.model('User', userSchema);

module.exports = User;
