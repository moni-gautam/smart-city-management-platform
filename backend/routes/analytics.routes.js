const express = require("express");
const router = express.Router();
const { getHourlyData, getSummary } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/hourly", protect, getHourlyData);
router.get("/summary", protect, getSummary);

module.exports = router;