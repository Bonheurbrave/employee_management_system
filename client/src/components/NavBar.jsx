import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaHome, FaUsers, FaClipboardList, FaCalendarCheck } from "react-icons/fa"; // React Icons

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    window.location.reload()
  };

  return (
    <div className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <FaHome size={24} /> {/* Home icon */}
          <Link to={'/'}>Employee Management</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/employees" className="flex items-center space-x-2 hover:text-gray-300">
            <FaUsers size={20} />
            <span>Employees</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
            <FaUserCircle size={24} />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 ease-in-out duration-300 "
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
