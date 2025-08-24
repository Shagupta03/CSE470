const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Models
const Admin = require("./models/adminModel"); // import Admin model

// Ensure default admin exists
async function seedAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const admin = new Admin({
        email: "admin@example.com",
        password: "admin123", // ⚠️ Hash with bcrypt in production!
      });
      await admin.save();
      console.log("✅ Default admin created: admin@example.com / admin123");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  }
}

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    seedAdmin(); // seed default admin after DB connect
  })
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

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const emergencyRoutes = require("./routes/emergencyRoutes");
app.use("/api/emergency", emergencyRoutes);

const guidelineRoutes = require("./routes/guidelineRoutes");
app.use("/api", guidelineRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
