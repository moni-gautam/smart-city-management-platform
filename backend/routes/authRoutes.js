const express = require("express");
const router = express.Router();

console.log("AUTH ROUTES LOADED");

const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;