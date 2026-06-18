import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome, FaTrafficLight,
  FaCloud, FaBolt, FaBell,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard",   path: "/",            icon: <FaHome /> },
  { label: "Traffic",     path: "/traffic",     icon: <FaTrafficLight /> },
  { label: "Environment", path: "/environment", icon: <FaCloud /> },
  { label: "Energy",      path: "/energy",      icon: <FaBolt /> },
  { label: "Alerts",      path: "/alerts",      icon: <FaBell /> },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">🏙 Smart City</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all
              ${location.pathname === item.path
                ? "bg-cyan-500 text-white"
                : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;