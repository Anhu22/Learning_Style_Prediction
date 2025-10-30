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
    readWriteScore: {
      type: Number,
      required: false,
    },
    readWriteTime: {
      type: Number,
      required: false,
    },
    visualScore: {
      type: Number,
      required: false,
    },
    visualTime: {
      type: Number,
      required: false,
    },
    kinestheticScore: {
      type: Number,
      required: false,
    },
    kinestheticTime: {
      type: Number,
      required: false,
    },
    audioScore: {
      type: Number,
      required: false,
    },
    audioTime: {
      type: Number,
      required: false,
    },
    predictedStyle: {
      type: String,
      required: false,
    },
    selfAssessedLearnerType: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Results', resultsSchema);
