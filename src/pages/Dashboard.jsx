import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { cityData } from "../data/mockData";
import TrafficChart from "../components/TrafficChart";
import Alerts from "../components/Alerts";
import HealthScore from "../components/HealthScore";
import CityMap from "../components/CityMap";
import ActivityFeed from "../components/ActivityFeed";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AIRecommendations from "../components/AIRecommendations";
import CityStats from "../components/CityStats";
import CityAI from "../components/CityAI";


import {
  FaTrafficLight,
  FaTrash,
  FaBolt,
  FaCloud,
  FaAmbulance,
} from "react-icons/fa";

function Dashboard() {
  useEffect(() => {
    setTimeout(() => {
      toast.error("🚦 High Traffic detected at Lanka Crossing");
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          <StatCard
            title="Traffic"
            value={`${cityData.traffic}%`}
            icon={<FaTrafficLight />}
          />

          <StatCard
            title="Waste Bins"
            value={cityData.wasteBins}
            icon={<FaTrash />}
          />

          <StatCard title="AQI" value={cityData.aqi} icon={<FaCloud />} />

          <StatCard
            title="Power Outages"
            value={cityData.outages}
            icon={<FaBolt />}
          />

          <StatCard
            title="Emergencies"
            value={cityData.emergencies}
            icon={<FaAmbulance />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2">
            <TrafficChart />
          </div>

          <HealthScore />
        </div>

        <div className="mt-6">
          <ActivityFeed />
        </div>

        <div className="mt-8"></div>

        <div className="mt-8">
          <CityMap />
        </div>
        <div className="mt-8">
          <AIRecommendations />
        </div>

        <div className="mt-8">
          <CityStats />
        </div>
        <CityAI />
      </div>
    </div>
  );
}

export default Dashboard;
