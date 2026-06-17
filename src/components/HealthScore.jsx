function HealthScore() {
  return (
 <div className="bg-slate-800 rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center">

  <h2 className="text-xl font-bold">
    City Health Score
  </h2>

  <div
    className="
    w-40
    h-40
    rounded-full
    border-8
    border-green-500
    flex
    items-center
    justify-center
    mx-auto
    mt-5
    text-5xl
    font-bold
    "
  >
    84
  </div>

</div>
  );
}

export default HealthScore;