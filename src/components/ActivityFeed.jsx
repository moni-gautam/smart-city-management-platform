import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

function ActivityFeed() {
  const [alerts, setAlerts] =
    useState([]);

  useEffect(() => {
    const fetchAlerts =
      async () => {
        try {
          const data =
            await getAlerts();

          setAlerts(
            data.alerts || []
          );

        } catch (error) {
          console.error(error);
        }
      };

    fetchAlerts();

    const interval =
      setInterval(
        fetchAlerts,
        30000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold mb-4">
        🚨 Live Activity Feed
      </h2>

      <div className="space-y-3">

        {alerts.length === 0 ? (

          <p className="text-slate-400">
            No active alerts
          </p>

        ) : (

          alerts
            .slice(0, 8)
            .map((alert) => (

              <div
                key={alert._id}
                className={`
                  p-4
                  rounded-xl
                  ${
                    alert.severity ===
                    "critical"
                      ? "bg-red-900/40 border border-red-500"
                      : "bg-yellow-900/30 border border-yellow-500"
                  }
                `}
              >

                <p className="font-semibold">
                  {alert.message}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  {new Date(
                    alert.createdAt
                  ).toLocaleTimeString()}
                </p>

              </div>

            ))

        )}

      </div>

    </div>
  );
}

export default ActivityFeed;