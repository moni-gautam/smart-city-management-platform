const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {getSensors ,getLatestSensors ,addSensorReading ,getSensorStats , } = require("../controllers/sensorController");
router.get("/latest", protect, getLatestSensors);
router.get("/stats", protect, getSensorStats);
router.get("/", protect, getSensors);
router.post("/", protect, addSensorReading);
module.exports = router;

