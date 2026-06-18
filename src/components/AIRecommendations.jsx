import { useEffect, useState } from "react";
import { getLatestSensors } from "../services/api";

function AIRecommendations() {
  const [recommendations, setRecommendations] =
    useState([]);

  useEffect(() => {
    const loadRecommendations =
      async () => {
        try {
          const data =
            await getLatestSensors();

          const sensors =
            data.latest;

          const recs = [];

          // Traffic
          if (
            sensors?.traffic?.value >
            180
          ) {
            recs.push(
              "🚦 Increase green signal duration at Varanasi Central"
            );
          }

          // AQI
          if (
            sensors?.air_quality?.value >
            100
          ) {
            recs.push(
              "🌫 Issue AQI advisory in Lanka zone"
            );
          }

          // Energy
          if (
            sensors?.energy?.value >
            500
          ) {
            recs.push(
              "⚡ Reduce non-essential grid load"
            );
          }

          // Water
          if (
            sensors?.water?.value >
            850
          ) {
            recs.push(
              "💧 Investigate abnormal water usage in Assi Ghat"
            );
          }

          // Waste
          if (
            sensors?.waste?.value >
            80
          ) {
            recs.push(
              "🗑 Dispatch waste collection vehicle immediately"
            );
          }

          if (recs.length === 0) {
            recs.push(
              "✅ All city systems operating normally"
            );
          }

          setRecommendations(
            recs
          );

        } catch (error) {
          console.error(error);
        }
      };

    loadRecommendations();

    const interval =
      setInterval(
        loadRecommendations,
        30000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Recommendations
      </h2>

      <div className="space-y-4">

        {recommendations.map(
          (item, index) => (
            <div
              key={index}
              className="
              bg-slate-700
              p-4
              rounded-xl
              border-l-4
              border-cyan-400
              "
            >
              {item}
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default AIRecommendations;