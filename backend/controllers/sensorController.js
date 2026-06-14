const Sensor = require("../models/Sensor.model");
const Alert = require("../models/Alert.model");

// ── THRESHOLDS ────────────────────────────────────────────────────
// These are the danger limits for each sensor type
// If a reading crosses these → an alert is automatically created
const THRESHOLDS = {
  traffic:     { warning: 150, critical: 200 }, // vehicles/min
  air_quality: { warning: 100, critical: 150 }, // AQI
  energy:      { warning: 400, critical: 500 }, // kWh
  water:       { warning: 800, critical: 1000 }, // L/hr
  waste:       { warning: 75,  critical: 90  }, // % full
};

// ── HELPER: check if reading crossed a threshold ──────────────────
// This runs after every new sensor reading is saved
// If value is dangerous → creates an Alert document automatically
const checkAndCreateAlert = async (sensorData) => {
  const { type, value, sensorId, location } = sensorData;
  const limits = THRESHOLDS[type];

  // If no thresholds defined for this type → skip
  if (!limits) return;

  let severity = null;
  let threshold = null;

  // Check critical first (more serious), then warning
  if (value >= limits.critical) {
    severity = "critical";
    threshold = limits.critical;
  } else if (value >= limits.warning) {
    severity = "warning";
    threshold = limits.warning;
  }

  // Value is normal → no alert needed
  if (!severity) return;

  // Check if an active alert already exists for this sensor
  // We don't want to spam duplicate alerts
  const existingAlert = await Alert.findOne({
    sensorId,
    type,
    status: "active",
  });

  // Already have an active alert for this sensor → don't create another
  if (existingAlert) return;

  // Create the alert
  await Alert.create({
    type,
    severity,
    message: `${type.replace("_", " ")} level ${value} exceeded ${severity} threshold of ${threshold} at ${location.zone}`,
    value,
    threshold,
    location,
    sensorId,
    status: "active",
  });

  console.log(`⚠️  Alert created: ${severity} ${type} at ${location.zone}`);
};

// ── GET ALL SENSORS ───────────────────────────────────────────────
// Route:  GET /api/sensors
// Access: Private (any logged-in user)
// Query params:
//   type  → filter by sensor type  e.g. ?type=traffic
//   limit → how many results       e.g. ?limit=50
//   zone  → filter by zone         e.g. ?zone=North Zone
// Example: GET /api/sensors?type=air_quality&limit=20

const getSensors = async (req, res) => {
  try {
    // req.query contains URL parameters after the ?
    const { type, limit = 50, zone } = req.query;

    // Build filter object dynamically
    // Only add a filter if the query param was actually provided
    const filter = {};
    if (type) filter.type = type;
    if (zone) filter["location.zone"] = zone;

    const sensors = await Sensor.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .limit(Number(limit));   // convert string to number

    res.status(200).json({
      count: sensors.length,
      sensors,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ── GET LATEST READING PER TYPE ───────────────────────────────────
// Route:  GET /api/sensors/latest
// Access: Private
// Returns the most recent reading for each of the 5 sensor types
// This powers the 4 metric cards on the dashboard

const getLatestSensors = async (req, res) => {
  try {
    const types = ["traffic", "air_quality", "energy", "water", "waste"];

    // For each type, find the single most recent document
    // Promise.all runs all 5 queries simultaneously (faster than one by one)
    const latest = await Promise.all(
      types.map((type) =>
        Sensor.findOne({ type }).sort({ createdAt: -1 })
      )
    );

    // Combine into one object: { traffic: {...}, air_quality: {...}, ... }
    const result = {};
    types.forEach((type, index) => {
      result[type] = latest[index];
    });

    res.status(200).json({ latest: result });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ── ADD NEW SENSOR READING ────────────────────────────────────────
// Route:  POST /api/sensors
// Access: Private
// What it does:
//   1. Saves the new reading to MongoDB
//   2. Automatically checks if it crossed a threshold
//   3. Creates an alert if dangerous
// This route is called by the seed job every 30 seconds

const addSensorReading = async (req, res) => {
  try {
    const { sensorId, type, value, unit, location } = req.body;

    // Save reading to DB
    const sensor = await Sensor.create({
      sensorId,
      type,
      value,
      unit,
      location,
      // status will be set based on value vs threshold
      status:
        value >= THRESHOLDS[type]?.critical ? "critical" :
        value >= THRESHOLDS[type]?.warning  ? "warning"  :
        "normal",
    });

    // Check if this reading needs an alert (runs in background)
    await checkAndCreateAlert(sensor);

    res.status(201).json({
      message: "Sensor reading added",
      sensor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ── GET SENSOR STATS FOR ANALYTICS ───────────────────────────────
// Route:  GET /api/sensors/stats
// Access: Private
// Returns count of sensors by status (normal/warning/critical)
// Powers the summary cards on analytics page

const getSensorStats = async (req, res) => {
  try {
    // MongoDB aggregation pipeline
    // $group groups documents by a field and counts them
    const stats = await Sensor.aggregate([
      {
        // $group = "group all documents by their status field"
        // _id: "$status" means: use the status field as the group key
        // count: { $sum: 1 } means: add 1 for each document in the group
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ stats });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getSensors,
  getLatestSensors,
  addSensorReading,
  getSensorStats,
};