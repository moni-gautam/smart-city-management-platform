const mongoose = require("mongoose");

// An Alert is created automatically when a sensor reading
// crosses a dangerous threshold
// Example: AQI reading of 210 → creates a CRITICAL air_quality alert

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["traffic", "air_quality", "energy", "water", "waste"],
      // Which city system triggered this alert
    },

    severity: {
      type: String,
      required: true,
      enum: ["info", "warning", "critical"],
      // info     → just a notice, no action needed
      // warning  → needs attention soon
      // critical → needs immediate action
    },

    message: {
      type: String,
      required: true,
      // Human readable description
      // Example: "AQI level 210 exceeded safe threshold of 150 at North Zone"
    },

    value: {
      type: Number,
      // The sensor value that triggered this alert
    },

    threshold: {
      type: Number,
      // The limit that was crossed
      // Example: value=210, threshold=150 → alert triggered
    },

    location: {
      zone: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },

    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
      // active   → alert is still happening, needs attention
      // resolved → someone marked it as handled
    },

    resolvedAt: {
      type: Date,
      default: null,
      // Filled in when status changes to "resolved"
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      // Which user clicked "Resolve" — links to User model
      // ref: "User" means Mongoose knows this ID belongs to a User document
    },

    sensorId: {
      type: String,
      // Which sensor triggered this alert
    },
  },

  { timestamps: true }
);

// Index on status — we query active alerts very frequently
// "show me all active alerts" runs thousands of times per day
alertSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Alert", alertSchema);