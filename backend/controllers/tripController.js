const Trip = require("../models/tripModel");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    console.log("Received trip data:", req.body);
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get trips by user email
exports.getTripsByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const userTrips = await Trip.find({ userEmail: email });
    res.status(200).json(userTrips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// (Optional) Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
