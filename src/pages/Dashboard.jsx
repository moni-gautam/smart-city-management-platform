import StatCard from "../components/StatCard";
import { cityData } from "../data/mockData";
import { FaTrafficLight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart City Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <StatCard
          title="Traffic Congestion"
          value={`${cityData.traffic}%`}
           icon={<FaTrash />}
        />

        <StatCard
          title="Full Waste Bins"
          value={cityData.wasteBins}
           icon={<FaTrash />}
        />

        <StatCard
          title="Air Quality Index"
          value={cityData.aqi}
           icon={<FaCloud />}
        />

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
    </div>
  );
}

export default Dashboard;