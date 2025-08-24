const Trip = require("../models/tripModel");

// 1️⃣ Fetch trips created by a specific user
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

// 2️⃣ Fetch all trips (for other users dashboard)
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Request to join a trip
exports.requestToJoin = async (req, res) => {
  try {
    const { tripId, requesterEmail } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Check if already requested
    const existing = trip.joinRequests.find(r => r.requesterEmail === requesterEmail);
    if (existing) return res.status(400).json({ message: "Request already sent" });

    trip.joinRequests.push({ requesterEmail });
    await trip.save();

    res.status(201).json({ message: "Request sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Accept or Reject a join request
exports.respondToRequest = async (req, res) => {
  try {
    const { tripId, requesterEmail, status } = req.body;
    if (!["accepted", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const request = trip.joinRequests.find(r => r.requesterEmail === requesterEmail);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await trip.save();

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
