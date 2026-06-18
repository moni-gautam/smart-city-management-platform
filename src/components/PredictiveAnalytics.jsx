import { useEffect, useState } from "react";
import { getLatestSensors } from "../services/api";

function PredictiveAnalytics() {

  const [predictions, setPredictions] =
    useState(null);

  useEffect(() => {

    const loadData = async () => {

      try {

        const data =
          await getLatestSensors();

        const sensors =
          data.latest;

        setPredictions({
          traffic: {
            current:
              sensors.traffic.value,
            predicted:
              (
                sensors.traffic.value *
                1.1
              ).toFixed(1),
          },

          air_quality: {
            current:
              sensors.air_quality.value,
            predicted:
              (
                sensors.air_quality.value *
                1.1
              ).toFixed(1),
          },

          energy: {
            current:
              sensors.energy.value,
            predicted:
              (
                sensors.energy.value *
                1.1
              ).toFixed(1),
          },

          water: {
            current:
              sensors.water.value,
            predicted:
              (
                sensors.water.value *
                1.1
              ).toFixed(1),
          },

        });

      } catch (err) {
        console.error(err);
      }

    };

    loadData();

  }, []);

  if (!predictions)
    return null;

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        📈 Next Hour Forecast
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        {Object.entries(
          predictions
        ).map(
          ([key, value]) => (

            <div
              key={key}
              className="
              bg-slate-700
              rounded-xl
              p-4
              "
            >
              <h3 className="capitalize font-semibold mb-3">
                {key.replace(
                  "_",
                  " "
                )}
              </h3>

              <p>
                Current:
                {" "}
                {value.current.toFixed(1)}
              </p>

              <p className="text-cyan-400 mt-2">
                Predicted:
                {" "}
                {value.predicted}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default PredictiveAnalytics;