import { useState } from "react";

function CityAI() {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const handleAsk = () => {

    const q =
      question.toLowerCase();

    if (
      q.includes("highest risk")
    ) {
      setAnswer(
        "🚨 Assi Ghat is currently the highest risk zone due to elevated water and environmental readings."
      );
    }

    else if (
      q.includes("traffic")
    ) {
      setAnswer(
        "🚦 Traffic congestion is currently highest near Varanasi Central."
      );
    }

    else if (
      q.includes("aqi")
    ) {
      setAnswer(
        "🌫 AQI levels are elevated in Lanka zone."
      );
    }

    else if (
      q.includes("energy")
    ) {
      setAnswer(
        "⚡ Energy consumption is unusually high in Orderly Bazar."
      );
    }

    else {
      setAnswer(
        "🤖 No recommendation available for this query."
      );
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        🤖 City AI Copilot
      </h2>

      <div className="flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask about city status..."
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
          onClick={handleAsk}
          className="
          bg-cyan-500
          px-5
          rounded-xl
          font-semibold
          "
        >
          Ask
        </button>

      </div>

      {answer && (

        <div
          className="
          mt-4
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

export default CityAI;