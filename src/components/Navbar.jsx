import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl">
      <h1 className="text-2xl font-bold">🏙 Smart City Command Center</h1>

      <div className="relative cursor-pointer">
        <FaBell className="text-2xl text-yellow-400" />

        <span
          className="
          absolute
          -top-2
          -right-2
          bg-red-500
          text-xs
          rounded-full
          w-5
          h-5
          flex
          items-center
          justify-center
          "
        >
          3
        </span>
      </div>
    </div>
  );
}

export default Navbar;
