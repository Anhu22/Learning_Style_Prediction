import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'https://learningstyleapp.ddns.net',
  'http://learningstyleapp.ddns.net',
  'http://localhost:3000',
  'http://localhost:5173'
];

// Custom CORS middleware to avoid the path-to-regexp issue
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Check if origin is allowed
  if (allowedOrigins.includes(origin) || !origin || process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== TEST & HEALTH ENDPOINTS ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Learning Style App API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    origin: req.headers.origin || 'none',
    allowedOrigins: allowedOrigins
  });
});

app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS test successful!',
    yourOrigin: req.headers.origin,
    corsAllowed: allowedOrigins.includes(req.headers.origin),
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// ==================== API ROUTES ====================
// Import routes
import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);

// ==================== ERROR HANDLING ====================
// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// ==================== SERVER STARTUP ====================
console.log('🚀 Starting Learning Style App Server');
console.log('====================================');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', PORT);
console.log('MongoDB:', process.env.MONGODB_URI ? 'Configured' : 'Not configured');
console.log('Allowed origins:', allowedOrigins);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️ Server will start without database');
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ Server is running!`);
    console.log(`   Local:    http://localhost:${PORT}`);
    console.log(`   Network:  http://0.0.0.0:${PORT}`);
    console.log(`\n📋 Test endpoints:`);
    console.log(`   • Health:      http://localhost:${PORT}/api/health`);
    console.log(`   • CORS Test:   http://localhost:${PORT}/api/test-cors`);
    console.log(`   • Auth Test:   http://localhost:${PORT}/api/auth/test`);
    console.log(`   • Results Test: http://localhost:${PORT}/api/results`);
    console.log(`\n🔧 CORS configured for:`);
    allowedOrigins.forEach(origin => console.log(`   • ${origin}`));
    console.log(`\n🎯 Frontend URL: https://learningstyleapp.ddns.net`);
  });
};

startServer().catch(error => {
  console.error('🔥 Failed to start server:', error);
  process.exit(1);
});