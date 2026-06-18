import CountUp from "react-countup";

<CountUp
 end={82}
 duration={2}
/>

function StatCard({ title, value, icon }) {
  return (
    <div className="
bg-gradient-to-r
from-slate-800
to-slate-900
rounded-2xl
p-6
shadow-xl
hover:scale-105
transition-all
duration-300
">
      <div className="text-cyan-400 text-3xl mb-3">
        {icon}
      </div>

      <h3 className="text-slate-400">
        {title}
      </h3>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;

