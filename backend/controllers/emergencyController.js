const Emergency = require("../models/emergencyModel");

// Send Emergency (from user)
exports.sendEmergency = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) return res.status(400).json({ message: "User email is required" });

    const newEmergency = new Emergency({ userEmail });
    await newEmergency.save();

    res.status(201).json({ message: "Emergency sent!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all emergencies (for admin)
exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ timestamp: -1 });
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
