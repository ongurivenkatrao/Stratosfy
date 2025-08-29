const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(" MongoDB Connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

// Simple Schema
const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  airTemperature: Number,
  surfaceTemperature: Number,
  batteryPer: Number,
  timestamp: { type: Date, default: Date.now }
});

const Device = mongoose.model("Device", deviceSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Stratosfy Backend is running");
});

// Get all devices
app.get("/api/devices", async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// Add new device reading
app.post("/api/devices", async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    const saved = await newDevice.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
