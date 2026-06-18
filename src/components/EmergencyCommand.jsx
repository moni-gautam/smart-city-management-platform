import { useState } from "react";
import EmergencyModal from "./EmergencyModel";

function EmergencyCommand() {
  const [message, setMessage] =
    useState("");

  const handleAction = (action) => {
    setMessage(
      `✅ ${action} dispatched successfully`
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const [modalOpen, setModalOpen] =
  useState(false);

const [selectedAction,
  setSelectedAction] =
  useState("");

  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        🚨 Emergency Command Center
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
{/* 
        <button
          onClick={() =>
            handleAction("Ambulance")
          }
          className="
          bg-red-600
          hover:bg-red-700
          p-4
          rounded-xl
          font-semibold
          transition
          "
        >
          🚑 Dispatch Ambulance
        </button> */}
        <button
  onClick={() => {
    setSelectedAction(
      "Dispatch Ambulance"
    );
    setModalOpen(true);
  }}
>
  🚑 Dispatch Ambulance
</button>

       <button
  onClick={() => {
    setSelectedAction(
      "Alert Police"
    );
    setModalOpen(true);
  }}
>
  👮 Alert Police
</button>
<button
  onClick={() => {
    setSelectedAction(
      "Traffic Response"
    );
    setModalOpen(true);
  }}
>
  🚦 Traffic Response
</button>
<button
  onClick={() => {
    setSelectedAction(
      "Municipal Team"
    );
    setModalOpen(true);
  }}
>
  🏢 Municipal Team
</button>

      </div>

      {message && (
        <div
          className="
          mt-5
          bg-green-900/40
          border
          border-green-500
          p-4
          rounded-xl
          "
        >
          {message}
        </div>
      )}
      <EmergencyModal
  isOpen={modalOpen}
  onClose={() =>
    setModalOpen(false)
  }
  action={selectedAction}
/>

    </div>
  );
}

export default EmergencyCommand;