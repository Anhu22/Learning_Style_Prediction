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

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'https://learningstyleapp.ddns.net',
  'http://learningstyleapp.ddns.net',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || !origin || process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== TEST ENDPOINTS ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS test OK',
    origin: req.headers.origin
  });
});

// ==================== API ROUTES ====================
import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';

app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);

// API 404 (NO wildcard!)
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// ==================== SERVE REACT BUILD (NO wildcard!) ====================
app.use(express.static(path.join(__dirname, 'build')));

// React routing handled automatically — no "*"
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
    console.log('⚠️ MongoDB failed:', err.message);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer().catch(error => {
  console.error('🔥 Failed to start server:', error);
  process.exit(1);
});