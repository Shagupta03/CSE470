// routes/tripDetailsRoutes.js
const express = require("express");
const router = express.Router();
const { getTripsByUser } = require("../controllers/tripDetailsController");

router.get("/user/:email", getTripsByUser);

module.exports = router;
