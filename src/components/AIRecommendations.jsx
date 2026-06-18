function AIRecommendations() {
  const recommendations = [
    "Increase green signal duration at Lanka Crossing",
    "Dispatch waste collection vehicle to Sector 4",
    "AQI likely to exceed safe limit within 2 hours",
    "Reposition ambulance near BHU Road",
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Recommendations
      </h2>

      <div className="space-y-4">

        {recommendations.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 p-4 rounded-xl"
          >
            💡 {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default AIRecommendations;