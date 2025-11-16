import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.static(path.join(__dirname, "build")));//do not change

// Catch-all: serve React's index.html for any non-API route
app.use((req, res, next) => {// do not change the entire block
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
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  // Start server even if MongoDB fails, for frontend serving
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT} (without MongoDB)`));
});
