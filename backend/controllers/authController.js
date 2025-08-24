const User = require("../models/userModel");
const Admin = require("../models/adminModel");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN (handle both admin & user)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if it's admin
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      return res.status(200).json({
        message: "Admin login successful",
        role: "admin",
        admin,
      });
    }

    // Otherwise normal user
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "User login successful",
      role: "user",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
