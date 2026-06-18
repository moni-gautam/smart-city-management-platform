import {
  useEffect,
  useState,
} from "react";

function HealthScore({
  score = 0,
}) {

  const [
    displayScore,
    setDisplayScore,
  ] = useState(0);

  useEffect(() => {

    let current = 0;

    const timer =
      setInterval(() => {

        current++;

        setDisplayScore(current);

        if (
          current >= score
        ) {
          clearInterval(timer);
        }

      }, 15);

    return () =>
      clearInterval(timer);

  }, [score]);

  let borderColor =
    "border-green-500";

  if (score < 70) {
    borderColor =
      "border-yellow-500";
  }

  if (score < 50) {
    borderColor =
      "border-red-500";
  }

  return (
    <div
      className="
      bg-slate-800
      rounded-2xl
      p-6
      h-[400px]
      flex
      flex-col
      items-center
      justify-center
      "
    >
      <h2
        className="
        text-xl
        font-bold
        "
      >
        City Health Score
      </h2>

      <div
        className={`
        w-40
        h-40
        rounded-full
        border-8
        ${borderColor}
        flex
        items-center
        justify-center
        mx-auto
        mt-5
        text-5xl
        font-bold
      `}
      >
        {displayScore}
      </div>

      <p
        className="
        mt-4
        text-lg
        font-semibold
        "
      >
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