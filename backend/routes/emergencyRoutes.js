const express = require("express");
const router = express.Router();
const { sendEmergency, getEmergencies } = require("../controllers/emergencyController");

router.post("/send", sendEmergency);        // User triggers emergency
router.get("/all", getEmergencies);         // Admin fetches all emergencies

module.exports = router;
