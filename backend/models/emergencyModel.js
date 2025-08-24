const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  message: { type: String, default: "Emergency Alert!" },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Emergency", emergencySchema);
