function RiskHeatmap({ sensorData }) {

  if (!sensorData) {
    return null;
  }

  const zones = [
    {
      zone:
        sensorData?.traffic?.location?.zone,
      score:
        sensorData?.traffic?.value || 0,
    },
    {
      zone:
        sensorData?.air_quality?.location?.zone,
      score:
        sensorData?.air_quality?.value || 0,
    },
    {
      zone:
        sensorData?.energy?.location?.zone,
      score:
        sensorData?.energy?.value || 0,
    },
    {
      zone:
        sensorData?.water?.location?.zone,
      score:
        sensorData?.water?.value || 0,
    },
    {
      zone:
        sensorData?.waste?.location?.zone,
      score:
        sensorData?.waste?.value || 0,
    },
  ];

  const sorted =
    zones.sort(
      (a, b) =>
        b.score - a.score
    );

  const getColor =
    (score) => {

      if (score > 500)
        return "bg-red-500";

      if (score > 150)
        return "bg-yellow-500";

      return "bg-green-500";
    };

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🌍 AI Risk Heatmap
      </h2>

      <div className="space-y-4">

        {sorted.map(
          (item, index) => (

            <div
              key={index}
              className="
              bg-slate-700
              rounded-xl
              p-4
              flex
              justify-between
              items-center
              "
            >

              <div>
                #{index + 1}
                {" "}
                {item.zone}
              </div>

              <div
                className={`
                  px-4 py-1 rounded-full
                  text-black font-bold
                  ${getColor(item.score)}
                `}
              >
                {item.score.toFixed(1)}
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default RiskHeatmap;