// controllers/adminController.js
const Admin = require("../models/adminModel"); // your Admin schema

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare password (plain-text for now, but you should hash in production)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Admin login successful", role: "admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS (example)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await require("../models/userModel").find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await require("../models/userModel").findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
