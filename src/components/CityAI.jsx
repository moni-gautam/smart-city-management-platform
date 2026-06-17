import { useState } from "react";

function CityAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    const q = question.toLowerCase();

    if (q.includes("traffic")) {
      setResponse(
        "🚦 Lanka Crossing currently has the highest congestion (82%)."
      );
    } else if (q.includes("aqi")) {
      setResponse(
        "🌫 AQI is currently 178 and exceeds the recommended safe limit."
      );
    } else if (q.includes("emergency")) {
      setResponse(
        "🚑 3 active emergency incidents are currently being handled."
      );
    } else if (q.includes("waste")) {
      setResponse(
        "🗑 12 waste bins require immediate collection."
      );
    } else {
      setResponse(
        "🤖 No specific data found. Try asking about traffic, AQI, waste, or emergencies."
      );
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-6
          right-6
          bg-cyan-500
          hover:bg-cyan-600
          text-white
          px-5
          py-3
          rounded-full
          shadow-xl
          font-bold
          z-50
        "
      >
        🤖 City AI
      </button>

      {/* Chat Window */}

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            w-[380px]
            bg-slate-800
            rounded-2xl
            shadow-2xl
            p-5
            z-50
          "
        >
          <h2 className="text-xl font-bold mb-4">
            Smart City AI Assistant
          </h2>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about city status..."
            className="
              w-full
              p-3
              rounded-lg
              bg-slate-700
              outline-none
              mb-3
            "
          />

          <button
            onClick={handleAsk}
            className="
              bg-cyan-500
              hover:bg-cyan-600
              px-4
              py-2
              rounded-lg
            "
          >
            Ask AI
          </button>

          {response && (
            <div
              className="
                mt-4
                bg-slate-700
                p-3
                rounded-lg
              "
            >
              {response}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CityAI;