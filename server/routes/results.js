/*import express from 'express';
import axios from 'axios';
import Results from '../models/Results.js';

const router = express.Router();

// ML SERVICE URL
const ML_URL = 'http://localhost:8000/predict';

// Rule-based percentage calculation
const calculateRulePercentages = (scores, times) => {
  const ratios = {};
  let total = 0;

  Object.keys(scores).forEach(key => {
    const time = times[key] || 1;
    ratios[key] = scores[key] / time;
    total += ratios[key];
  });

  const percentages = {};
  Object.keys(ratios).forEach(key => {
    percentages[key] = +(ratios[key] / total * 100).toFixed(2);
  });

  return percentages;
};

// Fusion logic
const fusePredictions = (rule, ml, alpha = 0.6) => {
  const combined = {};

  Object.keys(rule).forEach(style => {
    combined[style] =
    /*Formula for prediction
      +(alpha * rule[style] + (1 - alpha) * (ml[style] || 0)).toFixed(2);
  });

  return combined;
};

router.post('/', async (req, res) => {
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
    } = req.body;

    if (!schoolname || !rollno) {
      return res.status(400).json({ message: 'Schoolname and Rollno required' });
    }

    // ---------------- RULE BASED ----------------
    const scores = {
      Read: readWriteScore,
      Visual: visualScore,
      Auditory: audioScore,
      Kinesthetic: kinestheticScore
    };

    const times = {
      Read: readWriteTime,
      Visual: visualTime,
      Auditory: audioTime,
      Kinesthetic: kinestheticTime
    };

    const rulePercentages = calculateRulePercentages(scores, times);

    // ---------------- ML ----------------
    const mlPayload = {
      schoolname,
      readWriteScore,
      readWriteTime,
      visualScore,
      visualTime,
      audioScore,
      audioTime,
      kinestheticScore,
      kinestheticTime
    };

    const mlResp = await axios.post(ML_URL, mlPayload);
    const mlPercentages = mlResp.data.ml_percentages;

    // ---------------- FUSION ----------------
    const finalPercentages = fusePredictions(rulePercentages, mlPercentages);

    const sorted = Object.entries(finalPercentages)
      .sort((a, b) => b[1] - a[1]);

    const primaryStyle = sorted[0][0];
    const secondaryStyle = sorted[1][0];

    const updatedResult = await Results.findOneAndUpdate(
      { schoolname, rollno },
      {
        $set: {
          ...req.body,
          rulePercentages,
          mlPercentages,
          finalPercentages,
          primaryStyle,
          secondaryStyle
        }
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Hybrid prediction successful',
      rulePercentages,
      mlPercentages,
      finalPercentages,
      primaryStyle,
      secondaryStyle
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;*/

import express from 'express';
import axios from 'axios';
import Results from '../models/Results.js';

const router = express.Router();

// ML SERVICE URL
const ML_URL = 'http://localhost:8000/predict';

// ---------------- RULE BASED ----------------
// Same logic: score + time → ratio → percentage
// Time dominance softened using sqrt(time)
const calculateRulePercentages = (scores, times) => {
  const ratios = {};
  let total = 0;

  Object.keys(scores).forEach(key => {
    const time = times[key] || 1;

    // ✅ UPDATED LINE (only change)
    ratios[key] = scores[key] / Math.sqrt(time);

    total += ratios[key];
  });

  const percentages = {};
  Object.keys(ratios).forEach(key => {
    percentages[key] = +((ratios[key] / total) * 100).toFixed(2);
  });

  return percentages;
};

// ---------------- FUSION ----------------
// No changes here
const fusePredictions = (rule, ml, alpha = 0.6) => {
  const combined = {};

  Object.keys(rule).forEach(style => {
    combined[style] = +(
      alpha * rule[style] +
      (1 - alpha) * (ml[style] || 0)
    ).toFixed(2);
  });

  return combined;
};

router.post('/', async (req, res) => {
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
    } = req.body;

    if (!schoolname || !rollno) {
      return res.status(400).json({ message: 'Schoolname and Rollno required' });
    }

    // ---------------- RULE INPUT ----------------
    const scores = {
      Read: readWriteScore,
      Visual: visualScore,
      Auditory: audioScore,
      Kinesthetic: kinestheticScore
    };

    const times = {
      Read: readWriteTime,
      Visual: visualTime,
      Auditory: audioTime,
      Kinesthetic: kinestheticTime
    };

    const rulePercentages = calculateRulePercentages(scores, times);

    // ---------------- ML ----------------
    const mlPayload = {
      schoolname,
      readWriteScore,
      readWriteTime,
      visualScore,
      visualTime,
      audioScore,
      audioTime,
      kinestheticScore,
      kinestheticTime
    };

    const mlResp = await axios.post(ML_URL, mlPayload);
    const mlPercentages = mlResp.data.ml_percentages;

    // ---------------- FUSION ----------------
    const finalPercentages = fusePredictions(rulePercentages, mlPercentages);

    const sorted = Object.entries(finalPercentages)
      .sort((a, b) => b[1] - a[1]);

    const primaryStyle = sorted[0][0];
    const secondaryStyle = sorted[1][0];

    const updatedResult = await Results.findOneAndUpdate(
      { schoolname, rollno },
      {
        $set: {
          ...req.body,
          rulePercentages,
          mlPercentages,
          finalPercentages,
          primaryStyle,
          secondaryStyle
        }
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Hybrid prediction successful',
      rulePercentages,
      mlPercentages,
      finalPercentages,
      primaryStyle,
      secondaryStyle
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

