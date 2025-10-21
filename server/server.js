// server.js
require('dotenv').config(); // <- this loads your .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./routes/auth.js');
const resultsRoutes = require('./routes/results.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/results', resultsRoutes);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Catch-all handler to send back React’s index.html for any unknown routes
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
    if (err) next(err);
  });
});
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
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));