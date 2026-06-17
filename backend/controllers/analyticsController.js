const Sensor = require("../models/Sensor.model");
const Alert = require("../models/Alert.model");

const getHourlyData = async (req, res) => {
  try {
    const { type = "traffic", days = 1 } = req.query;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const data = await Sensor.aggregate([
      { $match: { type, createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            hour: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" } },
          },
          avgValue: { $avg: "$value" },
          maxValue: { $max: "$value" },
          minValue: { $min: "$value" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.hour": 1 } },
    ]);

    res.status(200).json({ type, days, data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getSummary = async (req, res) => {
  try {
    const totalSensors = await Sensor.countDocuments();
    const totalAlerts = await Alert.countDocuments();
    const activeAlerts = await Alert.countDocuments({ status: "active" });
    const criticalAlerts = await Alert.countDocuments({ severity: "critical", status: "active" });

    const alertsByType = await Alert.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const sensorsByStatus = await Sensor.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSensors,
      totalAlerts,
      activeAlerts,
      criticalAlerts,
      alertsByType,
      sensorsByStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getHourlyData, getSummary };