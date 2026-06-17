const Resource = require("../models/Resource.model");
const Sensor = require("../models/Sensor.model");

const getResources = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    const resources = await Resource.find(filter);
    res.status(200).json({ count: resources.length, resources });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const recommendations = [];

    // Get latest reading for each sensor type
    const types = ["traffic", "air_quality", "energy", "waste", "water"];
    const latest = await Promise.all(
      types.map((type) => Sensor.findOne({ type }).sort({ createdAt: -1 }))
    );

    const [traffic, airQuality, energy, waste, water] = latest;

    // Traffic recommendation
    if (traffic && traffic.value > 150) {
      recommendations.push({
        type: "traffic",
        priority: traffic.value > 200 ? "critical" : "warning",
        message: `High traffic at ${traffic.location.zone} (${traffic.value} vehicles/min)`,
        action: "Adjust signal timing at intersection to reduce congestion",
        value: traffic.value,
      });
    }

    // Air quality recommendation
    if (airQuality && airQuality.value > 100) {
      recommendations.push({
        type: "air_quality",
        priority: airQuality.value > 150 ? "critical" : "warning",
        message: `Poor air quality at ${airQuality.location.zone} (AQI: ${airQuality.value})`,
        action: "Restrict heavy vehicle movement, activate air purifiers",
        value: airQuality.value,
      });
    }

    // Energy recommendation
    if (energy && energy.value > 400) {
      recommendations.push({
        type: "energy",
        priority: energy.value > 500 ? "critical" : "warning",
        message: `High energy consumption at ${energy.location.zone} (${energy.value} kWh)`,
        action: "Shift load to Zone B, reduce non-essential lighting",
        value: energy.value,
      });
    }

    // Waste recommendation
    if (waste && waste.value > 75) {
      recommendations.push({
        type: "waste",
        priority: waste.value > 90 ? "critical" : "warning",
        message: `Waste bin at ${waste.location.zone} is ${waste.value}% full`,
        action: "Dispatch collection truck immediately",
        value: waste.value,
      });
    }

    // Water recommendation
    if (water && water.value > 800) {
      recommendations.push({
        type: "water",
        priority: water.value > 1000 ? "critical" : "warning",
        message: `High water usage at ${water.location.zone} (${water.value} L/hr)`,
        action: "Check for pipe leaks, restrict industrial usage",
        value: water.value,
      });
    }

    res.status(200).json({
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getResources, getRecommendations };