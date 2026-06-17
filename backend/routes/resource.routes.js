const express = require("express");
const router = express.Router();
const { getResources, getRecommendations } = require("../controllers/resourceController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getResources);
router.get("/recommendations", protect, getRecommendations);

module.exports = router;