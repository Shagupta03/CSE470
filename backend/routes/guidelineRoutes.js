const express = require("express");
const router = express.Router();
const { getGuideline } = require("../controllers/guidelineController");

router.get("/admin-guideline", getGuideline);

module.exports = router;
