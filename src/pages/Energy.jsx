import { useState, useEffect } from "react";
import API from "../services/api";
import { FaBolt } from "react-icons/fa";

function Energy() {
  const [sensors, setSensors] = useState([]);
  const [latest, setLatest] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsRes, latestRes, recRes] = await Promise.all([
          API.get("/sensors?type=energy&limit=20"),
          API.get("/sensors/latest"),
          API.get("/resources/recommendations"),
        ]);
        setSensors(sensorsRes.data.sensors);
        setLatest(latestRes.data.latest);
        setRecommendations(
          recRes.data.recommendations.filter((r) => r.type === "energy")
        );
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

  return (
    <div className="p-8 text-white">
      <div className="flex items-center gap-3 mb-8">
        <FaBolt className="text-cyan-400 text-3xl" />
        <h1 className="text-3xl font-bold">Energy Management</h1>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading energy data...</p>
      ) : (
        <>
          {/* Current stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Current Usage</p>
              <p className={`text-5xl font-bold ${
                latest?.energy?.status === "critical" ? "text-red-400" :
                latest?.energy?.status === "warning"  ? "text-yellow-400" :
                "text-green-400"
              }`}>
                {latest?.energy?.value ?? "—"}
              </p>
              <p className="text-slate-400 text-sm mt-1">kWh</p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Zone</p>
              <p className="text-xl font-bold text-white">
                {latest?.energy?.location?.zone ?? "—"}
              </p>
              <p className={`text-sm mt-2 capitalize ${
                latest?.energy?.status === "critical" ? "text-red-400" :
                latest?.energy?.status === "warning"  ? "text-yellow-400" :
                "text-green-400"
              }`}>
                {latest?.energy?.status ?? "—"}
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Warning Threshold</p>
              <p className="text-5xl font-bold text-yellow-400">400</p>
              <p className="text-slate-400 text-sm mt-1">kWh</p>
            </div>
          </div>

          {/* Energy recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4 mb-3">
                  <p className="text-white font-semibold">{rec.message}</p>
                  <p className="text-cyan-400 text-sm mt-1">→ {rec.action}</p>
                </div>
              ))}
            </div>
          )}

          {/* Energy readings table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Energy Usage History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-700">
                    <th className="text-left p-4">Zone</th>
                    <th className="text-left p-4">Usage (kWh)</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map((s) => (
                    <tr key={s._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="p-4 text-slate-300">{s.location.zone}</td>
                      <td className="p-4 text-white font-bold">{s.value}</td>
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

export default Energy;