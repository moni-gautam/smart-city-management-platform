import { useEffect, useState } from "react";
import { getSensorStats } from "../services/api";

function CityStats() {

  const [stats, setStats] =
    useState([]);

  useEffect(() => {

    const loadStats =
      async () => {

        try {

          const result =
            await getSensorStats();

          setStats(
            result.stats
          );

        } catch (error) {

          console.error(
            error
          );

        }

      };

    loadStats();

  }, []);

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🌍 City Statistics
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {stats.map((stat) => (

          <div
            key={stat._id}
            className="
              bg-slate-700
              rounded-xl
              p-4
              text-center
            "
          >

            <h3 className="text-slate-300">
              {stat._id.toUpperCase()}
            </h3>

            <p className="text-3xl font-bold mt-2">

              {stat.count}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CityStats;