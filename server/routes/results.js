// results.js
import express from 'express';
import Results from '../models/Results.js';

const router = express.Router();

// Save or update user results (partial updates allowed)
router.post('/', async (req, res) => {
  console.log('📩 Incoming POST /api/results', req.body);

  try {
    const {
      schoolname,
      rollno,
      password,
      readWriteScore,
      readWriteTime,
      visualScore,
      visualTime,
      audioScore,
      audioTime,
      kinestheticScore,
      kinestheticTime,
      predictedStyle,
    } = req.body;

    if (!rollno) {
      return res.status(400).json({ message: 'Roll number is required' });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (schoolname !== undefined) updateData.schoolname = schoolname;
    if (password !== undefined) updateData.password = password;
    if (readWriteScore !== undefined) updateData.readWriteScore = readWriteScore;
    if (readWriteTime !== undefined) updateData.readWriteTime = readWriteTime;
    if (visualScore !== undefined) updateData.visualScore = visualScore;
    if (visualTime !== undefined) updateData.visualTime = visualTime;
    if (audioScore !== undefined) updateData.audioScore = audioScore;
    if (audioTime !== undefined) updateData.audioTime = audioTime;
    if (kinestheticScore !== undefined) updateData.kinestheticScore = kinestheticScore;
    if (kinestheticTime !== undefined) updateData.kinestheticTime = kinestheticTime;
    if (predictedStyle !== undefined) updateData.predictedStyle = predictedStyle;

    const updatedResult = await Results.findOneAndUpdate(
      { rollno },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Results saved successfully!',
      result: updatedResult,
    });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
