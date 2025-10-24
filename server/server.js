require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./routes/auth.js');
const resultsRoutes = require('./routes/results.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // You can later restrict origin to frontend URL
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);

// Serve React frontend
// Make sure your React build is copied to server/build
app.use(express.static(path.join(__dirname, "build")));

// Catch-all: serve React's index.html for any non-API route
app.use((req, res, next) => {
  // Prevent API routes from being caught
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
  if (err) next(err);
  });
});

// Debug: check if env variables are loaded
console.log('Mongo URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/');
console.log('JWT Secret:', process.env.JWT_SECRET);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  // Listen on all interfaces (0.0.0.0) for EC2
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
