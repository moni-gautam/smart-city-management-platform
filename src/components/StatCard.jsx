// import CountUp from "react-countup";

// function StatCard({
//   title,
//   value,
//   icon,
// }) {

//   const numericValue =
//     Number(value);

//     console.log(
//   title,
//   value,
//   typeof value
// );


//   return (
//     <div
//       className="
//       bg-gradient-to-r
//       from-slate-800
//       to-slate-900
//       rounded-2xl
//       p-6
//       shadow-xl
//       hover:scale-105
//       transition-all
//       duration-300
//       "
//     >
//       console.log("ICON:", icon);
//       <div className="text-cyan-400 text-3xl mb-3">
//         {icon}
//       </div>

//       <h3 className="text-slate-400">
//         {title}
//       </h3>

//       <h2 className="text-4xl font-bold mt-2">
//         {Number.isFinite(numericValue) ? (
//       // line 44     <CountUp
//             end={numericValue}
//             duration={2}
//             decimals={1}
//           />
//         ) : (
//           value
//         )}
//       </h2>
//     </div>
//   );
// }

// export default StatCard;

import CountUp from "react-countup";

console.log(CountUp);

function StatCard({ title, value, icon }) {
  return (
    <div className="
bg-gradient-to-r
from-slate-800
to-slate-900
rounded-2xl
p-5
shadow-xl
h-[170px]
">
      <div>{icon}</div>

      <h3>{String(title)}</h3>

      <h2>{String(value)}</h2>
    </div>
  );
}

export default StatCard;