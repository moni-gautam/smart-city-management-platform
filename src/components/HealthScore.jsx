function HealthScore({ score = 0 }) {
  let borderColor = "border-green-500";

  if (score < 70) {
    borderColor = "border-yellow-500";
  }

  if (score < 50) {
    borderColor = "border-red-500";
  }

  return (
    <div
      className="
      bg-slate-800
      rounded-2xl
      p-6
      flex
      flex-col
      items-center
      justify-center
      "
    >
      <h2 className="text-xl font-bold mb-4">
        City Health Score
      </h2>

      <div
        className={`
        w-28
        h-28
        rounded-full
        border-8
        ${borderColor}
        flex
        items-center
        justify-center
        text-3xl
        font-bold
      `}
      >
        {score}
      </div>

      <p className="mt-4 text-lg font-semibold">
        {score >= 80
          ? "🟢 Excellent"
          : score >= 60
          ? "🟡 Good"
          : score >= 40
          ? "🟠 Warning"
          : "🔴 Critical"}
      </p>
    </div>
  );
}

export default HealthScore;