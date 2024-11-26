import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaUserTie, FaCalendarCheck, FaClipboardList, FaSignOutAlt, FaHome } from "react-icons/fa"; // React Icons

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-blue-800 text-white w-${isSidebarOpen ? "64" : "20"} transition-all duration-300 h-screen`}>
      <div className="flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/dashboard">EMS</Link>
        </div>
        <button onClick={toggleSidebar} className="text-white text-xl">
          {isSidebarOpen ? "<<" : ">>"}
        </button>
      </div>

      <div className="mt-6">
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaHome size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link to="/employees" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaUsers size={20} />
            {isSidebarOpen && <span>Employees</span>}
          </Link>

          <Link to="/attendance" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaCalendarCheck size={20} />
            {isSidebarOpen && <span>Attendance</span>}
          </Link>

          <Link to="/leave-requests" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaClipboardList size={20} />
            {isSidebarOpen && <span>Leave Requests</span>}
          </Link>

          <Link to="/profile" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaUserTie size={20} />
            {isSidebarOpen && <span>Profile</span>}
          </Link>

          <Link to="/login" className="flex items-center space-x-4 px-6 py-2 hover:bg-blue-700 rounded-md">
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
