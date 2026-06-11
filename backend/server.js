const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

console.log("SERVER FILE UPDATED");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.get("/hello", (req, res) => {
  res.send("HELLO ROUTE WORKING");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});