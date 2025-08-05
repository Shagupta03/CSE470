const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection failed:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const dashboardRoutes = require("./routes/dashboardRoute");
app.use("/api/dashboard", dashboardRoutes);
const tripRoutes = require("./routes/tripRoutes");
app.use("/api/trips", tripRoutes);

const tripDetailsRoutes = require("./routes/tripDetailsRoutes");
app.use("/api/tripDetails", tripDetailsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});