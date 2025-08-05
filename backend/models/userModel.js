const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nidNo: {
    type: String,
    required: true,
  },
  password: String,
});

module.exports = mongoose.model("User", userSchema);