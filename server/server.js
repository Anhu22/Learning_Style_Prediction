// server.js
import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS CONFIG ====================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'https://learningstyleapp.ddns.net',
    'http://learningstyleapp.ddns.net'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// ==================== BODY PARSING ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== TEST ENDPOINT ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ==================== API ROUTES ====================
import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';

app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);

// ==================== SERVE REACT FRONTEND ====================
app.use(express.static(path.join(__dirname, 'build')));

// React fallback route for SPA (except /api)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ==================== START SERVER ====================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
