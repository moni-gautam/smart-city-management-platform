import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "8AM", traffic: 40 },
  { time: "10AM", traffic: 65 },
  { time: "12PM", traffic: 92 },
  { time: "2PM", traffic: 70 },
  { time: "4PM", traffic: 86 },
];

function TrafficChart() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Traffic Trends
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="traffic"
            stroke="#22d3ee"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TrafficChart;