import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 🟢 REGISTER
router.post('/register', async (req, res) => {
  try {
    let { schoolname, rollno, password } = req.body;

    // ✅ Input validation
    if (!schoolname || !rollno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Normalize inputs
    schoolname = schoolname.trim().toLowerCase();
    rollno = Number(rollno);

    if (isNaN(rollno)) {
      return res.status(400).json({ message: 'Roll number must be a number' });
    }

    // ✅ Check if user already exists for this school
    const existingUser = await User.findOne({ schoolname, rollno });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists for this school' });
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      schoolname,
      rollno,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);

    // ✅ Handle duplicate key (index) error from MongoDB
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Roll number already exists for this school' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

// 🔵 LOGIN
router.post('/', async (req, res) => {
  try {
    let { schoolname, rollno, password } = req.body;

    // ✅ Input validation
    if (!schoolname || !rollno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Normalize data same way as registration
    schoolname = schoolname.trim().toLowerCase();
    rollno = Number(rollno);

    // ✅ Find user by school + rollno
    const user = await User.findOne({ schoolname, rollno });
    if (!user) {
      return res.status(401).json({ message: 'Invalid school name, roll number, or password' });
    }

    // ✅ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid school name, roll number, or password' });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
