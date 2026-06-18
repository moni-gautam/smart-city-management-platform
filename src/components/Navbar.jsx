import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAlerts } from "../hooks/useSensorData";

function Navbar() {
  const { user, logout } = useAuth();
  const { alerts } = useAlerts();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">
          🏙 Smart City Command Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back, {user?.name ?? "Admin"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell className="text-slate-400 text-xl cursor-pointer hover:text-cyan-400" />
          {alerts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {alerts.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <FaUserCircle className="text-xl text-cyan-400" />
          <span className="text-sm capitalize">{user?.role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 px-3 py-2 rounded-lg text-sm transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;