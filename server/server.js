// server.js
import 'dotenv/config'; // <- this loads your .env variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);

// Debug: check if env variables are loaded
console.log('Mongo URI:', process.env.MONGODB_URI);
console.log('JWT Secret:', process.env.JWT_SECRET);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
