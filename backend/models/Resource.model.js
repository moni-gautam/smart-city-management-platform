const mongoose = require("mongoose");

// A Resource is a physical city asset we track and optimize
// Examples: waste collection truck, electricity grid zone, traffic signal

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // Example: "Truck-07", "Grid Zone B", "Signal-MG-Road-North"
    },

    type: {
      type: String,
      required: true,
      enum: ["waste_truck", "energy_grid", "traffic_signal", "water_pump"],
    },

    status: {
      type: String,
      enum: ["available", "busy", "maintenance", "offline"],
      default: "available",
    },

    capacity: {
      current: { type: Number, default: 0 },
      maximum: { type: Number, default: 100 },
      unit: { type: String, default: "%" },
      // current/maximum tells us utilization
      // Example: waste truck current=85, maximum=100 → 85% full → needs dispatch
    },

    location: {
      lat: { type: Number },
      lng: { type: Number },
      zone: { type: String },
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);