// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import scoresRouter from "./routes/scores.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/scores", scoresRouter);

// health check
app.get("/", (req, res) => res.send("Backend server is running 🚀"));

// Connect to MongoDB & start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
