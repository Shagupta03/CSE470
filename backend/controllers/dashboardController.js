const User = require("../models/userModel");

exports.getDashboard = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      profile: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
