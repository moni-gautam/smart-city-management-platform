import { useState } from "react";

function CityAICopilot({ sensorData, alerts }) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

const askAI = () => {

  const q = question.toLowerCase();

  if (
    q.includes("traffic")
  ) {
    setAnswer(
      `Current traffic is ${
        sensorData?.traffic?.value?.toFixed(1)
      } vehicles/min in ${
        sensorData?.traffic?.location?.zone
      }.`
    );
    return;
  }

  if (
    q.includes("aqi")
  ) {
    setAnswer(
      `Current AQI is ${
        sensorData?.air_quality?.value?.toFixed(1)
      } in ${
        sensorData?.air_quality?.location?.zone
      }.`
    );
    return;
  }

  if (
    q.includes("water")
  ) {
    setAnswer(
      `Water consumption is ${
        sensorData?.water?.value?.toFixed(1)
      } L/hr.`
    );
    return;
  }

  if (
    q.includes("energy")
  ) {
    setAnswer(
      `Current energy load is ${
        sensorData?.energy?.value?.toFixed(1)
      } kWh.`
    );
    return;
  }

  if (
    q.includes("waste")
  ) {
    setAnswer(
      `Waste bin utilization is ${
        sensorData?.waste?.value?.toFixed(1)
      }%.`
    );
    return;
  }

  if (
    q.includes("critical")
  ) {

    const sensors = [
      {
        name: "Traffic",
        value:
          sensorData?.traffic?.value || 0,
      },
      {
        name: "AQI",
        value:
          sensorData?.air_quality?.value || 0,
      },
      {
        name: "Energy",
        value:
          sensorData?.energy?.value || 0,
      },
      {
        name: "Water",
        value:
          sensorData?.water?.value || 0,
      },
      {
        name: "Waste",
        value:
          sensorData?.waste?.value || 0,
      },
    ];

    const highest =
      sensors.sort(
        (a,b)=>b.value-a.value
      )[0];

    setAnswer(
      `Highest risk currently is ${highest.name} with value ${highest.value.toFixed(1)}`
    );

    return;
  }

  setAnswer(
    `Try asking:
    
• traffic status
• aqi level
• highest risk
• water usage
• energy load`
  );
};

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        🤖 Smart City Copilot
      </h2>

      <div className="flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask something..."
          className="
          flex-1
          bg-slate-700
          rounded-xl
          px-4
          py-3
          outline-none
          "
        />

        <button
          onClick={askAI}
          className="
          bg-cyan-500
          px-6
          rounded-xl
          font-bold
          "
        >
          Ask
        </button>

      </div>

      {answer && (
        <div
          className="
          mt-5
          bg-slate-700
          p-4
          rounded-xl
          "
        >
          {answer}
        </div>
      )}

    </div>
  );
}

export default CityAICopilot;