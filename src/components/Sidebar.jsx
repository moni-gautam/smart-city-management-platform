import {
  FaHome,
  FaTrafficLight,
  FaBolt,
  FaCloud,
  FaRobot
} from "react-icons/fa";

function Sidebar() {
  return (
<div className="w-64 bg-slate-900 p-6">

  <h2 className="text-2xl font-bold mb-8">
    🏙 Smart City
  </h2>

  <ul className="space-y-6">

    <li className="hover:text-cyan-400 cursor-pointer">
      Dashboard
    </li>

    <li className="hover:text-cyan-400 cursor-pointer">
      Traffic
    </li>

    <li className="hover:text-cyan-400 cursor-pointer">
      Environment
    </li>

    <li className="hover:text-cyan-400 cursor-pointer">
      Energy
    </li>

  </ul>

</div>
  );
}

export default Sidebar;