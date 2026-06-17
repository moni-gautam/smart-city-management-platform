const mongoose = require("mongoose");


const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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