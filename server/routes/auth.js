// auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { schoolname, rollno, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ rollno });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      schoolname,
      rollno,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/', async (req, res) => {
  try {
    const { rollno, password } = req.body;

    // Find user by rollno
    const user = await User.findOne({ rollno });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        schoolname: user.schoolname,
        rollno: user.rollno,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Progress fetch endpoint: GET /api/auth/progress?schoolname=...&rollno=...
router.get('/progress', async (req, res) => {
  try {
    const { schoolname, rollno } = req.query;
    if (!schoolname || !rollno) {
      return res.status(400).json({ message: 'schoolname and rollno required' });
    }

    const user = await User.findOne({ schoolname, rollno: Number(rollno) });
    if (!user) {
      // No record: return zeros
      return res.json({
        readScore: 0,
        visualScore: 0,
        audioScore: 0,
        kinestheticScore: 0,
        readTime: 0,
        visualTime: 0,
        audioTime: 0,
        kinestheticTime: 0,
        predictedStyle: '',
      });
    }

    // Return progress fields
    return res.json({
      readScore: user.readScore || 0,
      visualScore: user.visualScore || 0,
      audioScore: user.audioScore || 0,
      kinestheticScore: user.kinestheticScore || 0,
      readTime: user.readTime || 0,
      visualTime: user.visualTime || 0,
      audioTime: user.audioTime || 0,
      kinestheticTime: user.kinestheticTime || 0,
      predictedStyle: user.predictedStyle || '',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
