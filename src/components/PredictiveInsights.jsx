function PredictiveInsights({ sensorData }) {

  if (!sensorData) return null;

  const traffic =
    sensorData?.traffic?.value || 0;

  const aqi =
    sensorData?.air_quality?.value || 0;

  const energy =
    sensorData?.energy?.value || 0;

  const water =
    sensorData?.water?.value || 0;

  const waste =
    sensorData?.waste?.value || 0;

  const predict = (value) =>
    (value * 1.15).toFixed(1);

  const cards = [
    {
      title: "Traffic",
      current: traffic,
      predicted: predict(traffic),
      icon: "🚦",
    },
    {
      title: "AQI",
      current: aqi,
      predicted: predict(aqi),
      icon: "☁️",
    },
    {
      title: "Energy",
      current: energy,
      predicted: predict(energy),
      icon: "⚡",
    },
    {
      title: "Water",
      current: water,
      predicted: predict(water),
      icon: "💧",
    },
    {
      title: "Waste",
      current: waste,
      predicted: predict(waste),
      icon: "🗑️",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        📈 30-Minute Predictions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="
            bg-slate-700
            rounded-xl
            p-4
            "
          >

            <div className="text-2xl mb-2">
              {card.icon}
            </div>

            <h3 className="font-bold">
              {card.title}
            </h3>

            <p className="text-slate-400 mt-2">
              Current:
              {" "}
              {card.current.toFixed(1)}
            </p>

            <p className="text-cyan-400 font-bold mt-2">
              Predicted:
              {" "}
              {card.predicted}
              ↑
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PredictiveInsights;