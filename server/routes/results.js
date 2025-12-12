// routes/results.js
import express from 'express';
import Results from '../models/Results.js'; // Your Mongoose model

const router = express.Router();

// Save or update user results
router.post('/', async (req, res) => {
  console.log('📩 Incoming POST /api/results:', req.body);

  try {
    const {
      schoolname,
      rollno,
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

    if (!rollno || !schoolname) {
      return res.status(400).json({ message: 'Roll number  or School name is required' });
    }

    // Build the update object only with provided fields
    const updateData = {};

    updateData.schoolname = schoolname; // Always include schoolname

    if (readWriteScore !== undefined) updateData.readWriteScore = Number(readWriteScore);
    if (readWriteTime !== undefined) updateData.readWriteTime = Number(readWriteTime);

    if (visualScore !== undefined) updateData.visualScore = Number(visualScore);
    if (visualTime !== undefined) updateData.visualTime = Number(visualTime);

    if (audioScore !== undefined) updateData.audioScore = Number(audioScore);
    if (audioTime !== undefined) updateData.audioTime = Number(audioTime);

    if (kinestheticScore !== undefined) updateData.kinestheticScore = Number(kinestheticScore);
    if (kinestheticTime !== undefined) updateData.kinestheticTime = Number(kinestheticTime);

    if (predictedStyle !== undefined) updateData.predictedStyle = predictedStyle;

    //if (selfAssessedLearnerType !== undefined) updateData.selfAssessedLearnerType = selfAssessedLearnerType;

    // Update or create the result document
    const updatedResult = await Results.findOneAndUpdate(
      { schoolname, rollno },
      updateData,
      { new: true, upsert: true }
    );

    console.log('✅ Result saved/updated:', updatedResult);

    res.status(200).json({
      message: 'Results saved successfully!',
      result: updatedResult,
    });
  } catch (err) {
    console.error('❌ Error saving result:', err);
    res.status(500).json({ message: 'Failed to save result', error: err.message });
  }
});

export default router;
