import { useState, useEffect } from "react";
import API from "../services/api";
import { FaCloud } from "react-icons/fa";

function Environment() {
  const [sensors, setSensors] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsRes, latestRes] = await Promise.all([
          API.get("/sensors?type=air_quality&limit=20"),
          API.get("/sensors/latest"),
        ]);
        setSensors(sensorsRes.data.sensors);
        setLatest(latestRes.data.latest);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getAQILabel = (value) =>
    value <= 50  ? { label: "Good",      color: "text-green-400" } :
    value <= 100 ? { label: "Moderate",  color: "text-yellow-400" } :
    value <= 150 ? { label: "Unhealthy", color: "text-orange-400" } :
    value <= 200 ? { label: "Very Unhealthy", color: "text-red-400" } :
                   { label: "Hazardous", color: "text-purple-400" };

  const currentAQI = latest?.air_quality?.value;
  const aqiInfo = currentAQI ? getAQILabel(currentAQI) : null;

  return (
    <div className="p-8 text-white">
      <div className="flex items-center gap-3 mb-8">
        <FaCloud className="text-cyan-400 text-3xl" />
        <h1 className="text-3xl font-bold">Environment Monitoring</h1>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading environment data...</p>
      ) : (
        <>
          {/* Current AQI card */}
          {latest?.air_quality && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 col-span-1">
                <p className="text-slate-400 text-sm mb-2">Current AQI</p>
                <p className={`text-6xl font-bold ${aqiInfo?.color}`}>
                  {currentAQI}
                </p>
                <p className={`text-lg mt-2 ${aqiInfo?.color}`}>
                  {aqiInfo?.label}
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  {latest.air_quality.location.zone}
                </p>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Water Usage</p>
                <p className="text-4xl font-bold text-blue-400">
                  {latest.water?.value ?? "—"}
                </p>
                <p className="text-slate-400 text-sm mt-1">L/hr</p>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Waste Level</p>
                <p className="text-4xl font-bold text-orange-400">
                  {latest.waste?.value ?? "—"}%
                </p>
                <p className="text-slate-400 text-sm mt-1">bin capacity</p>
              </div>
            </div>
          )}

          {/* AQI readings table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Air Quality History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-700">
                    <th className="text-left p-4">Zone</th>
                    <th className="text-left p-4">AQI Value</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map((s) => {
                    const info = getAQILabel(s.value);
                    return (
                      <tr key={s._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="p-4 text-slate-300">{s.location.zone}</td>
                        <td className={`p-4 font-bold ${info.color}`}>{s.value}</td>
                        <td className={`p-4 text-sm ${info.color}`}>{info.label}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            s.status === "critical" ? "bg-red-500/20 text-red-400" :
                            s.status === "warning"  ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-green-500/20 text-green-400"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
                          {new Date(s.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Environment;