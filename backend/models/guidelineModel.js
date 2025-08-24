// models/guidelineModel.js
const mongoose = require("mongoose");

const guidelineSchema = new mongoose.Schema({
  content: { type: String, required: true },
  
});

module.exports = mongoose.model("Guideline", guidelineSchema);
