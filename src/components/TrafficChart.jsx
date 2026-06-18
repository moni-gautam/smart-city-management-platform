import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import {
  getTrafficHistory,
} from "../services/api";

function TrafficChart() {

  const [data, setData] =
    useState([]);

  useEffect(() => {

    const fetchTraffic =
      async () => {

        try {

          const result =
            await getTrafficHistory();

          const chartData =
            result.sensors
              .reverse()
              .map(
                (
                  sensor,
                  index
                ) => ({

                  time:
                    index + 1,

                  traffic:
                    sensor.value,

                })
              );

          setData(
            chartData
          );

        } catch (error) {

          console.error(
            error
          );

        }

      };

    fetchTraffic();

    const interval =
      setInterval(
        fetchTraffic,
        30000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Live Traffic Trends
      </h2>

  
<ResponsiveContainer
  width="100%"
  height="100%"
>
        <LineChart
          data={data}
        >
          <XAxis
            dataKey="time"
          />

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