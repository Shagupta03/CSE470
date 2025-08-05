const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");

router.post("/", getDashboard); // POST to send email in body

module.exports = router;
