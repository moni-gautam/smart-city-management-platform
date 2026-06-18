import { useState, useEffect } from "react";
import API from "../services/api";
import { FaTrafficLight } from "react-icons/fa";

function Traffic() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsRes, statsRes] = await Promise.all([
          API.get("/sensors?type=traffic&limit=20"),
          API.get("/sensors/stats"),
        ]);
        setSensors(sensorsRes.data.sensors);
        setStats(statsRes.data.stats);
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

  const getStatusColor = (status) =>
    status === "critical" ? "text-red-400 bg-red-500/10 border-red-500" :
    status === "warning"  ? "text-yellow-400 bg-yellow-500/10 border-yellow-500" :
    "text-green-400 bg-green-500/10 border-green-500";

  return (
    <div className="p-8 text-white">
      <div className="flex items-center gap-3 mb-8">
        <FaTrafficLight className="text-cyan-400 text-3xl" />
        <h1 className="text-3xl font-bold">Traffic Management</h1>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading traffic data...</p>
      ) : (
        <>
          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s._id} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm capitalize">{s._id} sensors</p>
                <p className="text-white text-2xl font-bold mt-1">{s.count}</p>
              </div>
            ))}
          </div>

          {/* Sensor readings table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Live Traffic Readings</h2>
              <p className="text-slate-400 text-sm">Updates every 30 seconds</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-700">
                    <th className="text-left p-4">Sensor ID</th>
                    <th className="text-left p-4">Zone</th>
                    <th className="text-left p-4">Value</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map((s) => (
                    <tr key={s._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="p-4 font-mono text-cyan-400">{s.sensorId}</td>
                      <td className="p-4 text-slate-300">{s.location.zone}</td>
                      <td className="p-4 text-white font-bold">{s.value} {s.unit}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">
                        {new Date(s.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Traffic;