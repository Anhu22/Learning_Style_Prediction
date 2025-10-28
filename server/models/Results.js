// Results.js
const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema(
  {
    schoolname: {
      type: String,
      required: true,
    },
    rollno: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    readWriteScore: {
      type: Number,
      required: true,
    },
    readWriteTime: {
      type: Number,
      required: true,
    },
    visualScore: {
      type: Number,
      required: true,
    },
    visualTime: {
      type: Number,
      required: true,
    },
    kinestheticScore: {
      type: Number,
      required: true,
    },
    kinestheticTime: {
      type: Number,
      required: true,
    },
    audioScore: {
      type: Number,
      required: true,
    },
    audioTime: {
      type: Number,
      required: true,
    },
    predictedStyle: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    selfAssessedStyle: {
=======
    selfAssessedLearnerType: {
>>>>>>> db-fix-branch
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Results', resultsSchema);
