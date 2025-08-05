const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: false,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  budget: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trip", tripSchema);
