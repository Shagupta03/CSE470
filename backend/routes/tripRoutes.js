const express = require("express");
const router = express.Router();
const { createTrip, getTrips } = require("../controllers/tripController");
const { getTripsByUser } = require("../controllers/tripController");


router.post("/create", createTrip);
router.get("/", getTrips); // Optional: list all trips
router.get("/user/:email", getTripsByUser);

module.exports = router;
