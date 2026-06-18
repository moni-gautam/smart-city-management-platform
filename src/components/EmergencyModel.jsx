function EmergencyModal({
  isOpen,
  onClose,
  action,
}) {

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        bg-slate-800
        p-8
        rounded-2xl
        w-[500px]
        "
      >

        <h2 className="text-2xl font-bold mb-4">
          🚨 Emergency Response
        </h2>

        <div className="space-y-4">

          <p>
            Action:
            <span className="text-cyan-400 ml-2">
              {action}
            </span>
          </p>

          <p>
            Nearest Unit:
            <span className="text-green-400 ml-2">
              BHU Trauma Center
            </span>
          </p>

          <p>
            ETA:
            <span className="text-yellow-400 ml-2">
              7 Minutes
            </span>
          </p>

          <p className="text-green-400 font-bold">
            ✓ Team Successfully Dispatched
          </p>

        </div>

        <button
          onClick={onClose}
          className="
          mt-6
          bg-red-500
          px-4
          py-2
          rounded-lg
          "
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default EmergencyModal;