import StatCard from "../components/StatCard";
import { cityData } from "../data/mockData";

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
        />

        <StatCard
          title="Full Waste Bins"
          value={cityData.wasteBins}
        />

        <StatCard
          title="Air Quality Index"
          value={cityData.aqi}
        />

        <StatCard
          title="Power Outages"
          value={cityData.outages}
        />

        <StatCard
          title="Emergencies"
          value={cityData.emergencies}
        />
      </div>
    </div>
  );
}

export default Dashboard;