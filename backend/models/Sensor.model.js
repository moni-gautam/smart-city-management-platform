const mongoose = require("mongoose");


const sensorSchema = new mongoose.Schema(
  {
    sensorId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      // These are the 5 city systems we monitor
      enum: ["traffic", "air_quality", "energy", "water", "waste"],
    },

    value: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      // Human readable unit for the value
      // Examples: "vehicles/min", "AQI", "kWh", "L/hr", "%"
    },

    location: {
      // GeoJSON format — standard way to store coordinates
      // This powers the city MAP feature
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      zone: { type: String, required: true },
      // zone = area name like "North Zone", "MG Road", "Industrial Area"
    },

    status: {
      type: String,
      enum: ["normal", "warning", "critical"],
      default: "normal",
    },
  },

  {
    timestamps: true,
  }
);

sensorSchema.index({ type: 1, createdAt: -1 });

// Index on sensorId — speeds up "latest reading from sensor TRAFFIC-001"
sensorSchema.index({ sensorId: 1 });

module.exports = mongoose.model("Sensor", sensorSchema);