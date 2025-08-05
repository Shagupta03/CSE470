const Trip = require("../models/tripModel");

// Get trip details by user email
exports.getTripsByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const tripDetails = await Trip.find({ userEmail: email });
    res.status(200).json(tripDetails);
  } catch (error) {
    console.error("Error fetching trip details:", error);
    res.status(500).json({ message: error.message });
  }
};
