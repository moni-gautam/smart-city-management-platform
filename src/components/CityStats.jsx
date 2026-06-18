function CityStats() {
  const stats = [
    {
      title: "Population Monitored",
      value: "1.2M",
      icon: "👥",
    },
    {
      title: "Active Sensors",
      value: "4,532",
      icon: "📡",
    },
    {
      title: "Connected Devices",
      value: "12,832",
      icon: "🔗",
    },
    {
      title: "Departments Online",
      value: "5",
      icon: "🏢",
    },
    {
      title: "Incidents Today",
      value: "12",
      icon: "🚨",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🌍 City Statistics
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="
              bg-slate-700
              rounded-xl
              p-4
              text-center
            "
          >
            <div className="text-3xl">
              {stat.icon}
            </div>

            <h3 className="mt-2 text-slate-300">
              {stat.title}
            </h3>

            <p className="text-2xl font-bold mt-2">
              {stat.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CityStats;