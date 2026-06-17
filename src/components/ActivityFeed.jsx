function ActivityFeed() {
  const activities = [
    {
      type: "traffic",
      message: "Traffic spike detected at Lanka Crossing",
      time: "2 mins ago",
    },
    {
      type: "waste",
      message: "Waste Bin B12 reached 95% capacity",
      time: "5 mins ago",
    },
    {
      type: "energy",
      message: "Power restored in Sector 4",
      time: "8 mins ago",
    },
    {
      type: "emergency",
      message: "Ambulance dispatched to BHU Road",
      time: "12 mins ago",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-full">

      <h2 className="text-xl font-bold mb-4">
        Live Activity Feed
      </h2>

      <div className="space-y-4">

        {activities.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 p-3 rounded-lg"
          >
            <p>{item.message}</p>

            <span className="text-sm text-slate-400">
              {item.time}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ActivityFeed;