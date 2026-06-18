import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TrafficChart from "../components/TrafficChart";
import HealthScore from "../components/HealthScore";
import CityMap from "../components/CityMap";
import ActivityFeed from "../components/ActivityFeed";
import Navbar from "../components/Navbar";
import AIRecommendations from "../components/AIRecommendations";
import CityStats from "../components/CityStats";
import CityAI from "../components/CityAI";
import { useState, useEffect } from "react";
import {
  getLatestSensors,
  getSensorStats,
} from "../services/api";

import RiskHeatmap
from "../components/RiskHeatmap";
import PredictiveInsights
from "../components/PredictiveInsights";

import {
  FaTrafficLight,
  FaTrash,
  FaBolt,
  FaCloud,
  FaTint,
} from "react-icons/fa";
import RiskZones from "../components/RiskZones";
import CityAICopilot
from "../components/CityAICopilot";
import { getAlerts }
from "../services/api";
import EmergencyCommand from "../components/EmergencyCommand";
import PredictiveAnalytics
from "../components/PredictiveAnalytics";
function Dashboard() {

const [sensorData, setSensorData] =
  useState(null);

const [sensorStats, setSensorStats] =
  useState([]);

  const [alerts, setAlerts] =
  useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const latest =
        await getLatestSensors();

      const stats =
        await getSensorStats();

      setSensorData(latest.latest);
      setSensorStats(stats.stats);
      const alertData =
  await getAlerts();

setAlerts(
  alertData.alerts
);

      console.log(latest);
      console.log(stats);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  const interval =
    setInterval(fetchData, 30000);

  return () =>
    clearInterval(interval);
}, []);


  const normal =
  sensorStats.find(
    (s) => s._id === "normal"
  )?.count || 0;

const warning =
  sensorStats.find(
    (s) => s._id === "warning"
  )?.count || 0;

const critical =
  sensorStats.find(
    (s) => s._id === "critical"
  )?.count || 0;

const total =
  normal +
  warning +
  critical;

const healthScore =
  total === 0
    ? 100
    : Math.max(
        0,
        Math.round(
          100 -
          (warning / total) * 30 -
          (critical / total) * 70
        )
      );
const previousScore = healthScore - 3;

 return (
  <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

    <Sidebar />

    <div className="flex-1 p-8">

      <Navbar />

      {/* TOP SECTION */}
      <div className="grid lg:grid-cols-6 gap-6 mt-8">

        <HealthScore
          score={healthScore}
          trend={healthScore - previousScore}
        />

        <StatCard
          title="Traffic"
          value={
            sensorData?.traffic?.value?.toFixed(1) ||
            "Loading..."
          }
          icon="🚦"
        />

        <StatCard
          title="Waste"
          value={
            sensorData?.waste?.value?.toFixed(1) ||
            "Loading..."
          }
          icon="🗑️"
        />

        <StatCard
          title="AQI"
          value={
            sensorData?.air_quality?.value?.toFixed(1) ||
            "Loading..."
          }
          icon="🌫️"
        />

        <StatCard
          title="Energy"
          value={
            sensorData?.energy?.value?.toFixed(1) ||
            "Loading..."
          }
          icon="⚡"
        />

        <StatCard
          title="Water"
          value={
            sensorData?.water?.value?.toFixed(1) ||
            "Loading..."
          }
          icon="💧"
        />

      </div>

      <div className="flex gap-8 mt-4 text-sm text-slate-400">

        <p>🟢 Normal: {normal}</p>

        <p>🟡 Warning: {warning}</p>

        <p>🔴 Critical: {critical}</p>

      </div>

      {/* TRAFFIC + HEATMAP */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2">
          <TrafficChart />
        </div>

        <RiskHeatmap
          sensorData={sensorData}
        />

      </div>

      {/* ACTIVITY + EMERGENCY */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <ActivityFeed />

        <EmergencyCommand />

      </div>

      {/* AI COPILOT + PREDICTIONS */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <CityAICopilot
          sensorData={sensorData}
          alerts={alerts}
        />

        <PredictiveInsights
          sensorData={sensorData}
        />

      </div>

      {/* MAP */}

      <div className="mt-8">

        <CityMap />

      </div>

      {/* RECOMMENDATIONS + STATS */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <AIRecommendations />

        <CityStats />

      </div>

    </div>

  </div>
);
}

export default Dashboard;
