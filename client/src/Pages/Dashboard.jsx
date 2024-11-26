import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserTie, FaBuilding, FaClipboardList, FaChartBar } from "react-icons/fa";
// import axios from "../../services/api";
import axios from 'axios'

// Import subcomponents
import AttendanceChart from "../components/AttendanceChart";
import DepartmentChart from "../components/DepartmentChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0,
    attendanceRate: 0,
  });

  const [recentLeaves, setRecentLeaves] = useState([]);

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
        const employeeData = await axios.get("/employees/stats");
        const leaveData = await axios.get("/leave-requests/recent");
        setStats({
          totalEmployees: employeeData.data.totalEmployees,
          totalDepartments: employeeData.data.totalDepartments,
          pendingLeaves: leaveData.data.pendingLeaves,
          attendanceRate: employeeData.data.attendanceRate,
        });
        setRecentLeaves(leaveData.data.recentLeaves);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4"
      >
        Admin Dashboard
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaUserTie className="text-3xl mb-2" />
          <div className="text-lg font-semibold">Total Employees</div>
          <div className="text-2xl">{stats.totalEmployees}</div>
        </motion.div>
        <motion.div
          className="p-4 bg-green-500 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaBuilding className="text-3xl mb-2" />
          <div className="text-lg font-semibold">Total Departments</div>
          <div className="text-2xl">{stats.totalDepartments}</div>
        </motion.div>
        <motion.div
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaClipboardList className="text-3xl mb-2" />
          <div className="text-lg font-semibold">Pending Leave Requests</div>
          <div className="text-2xl">{stats.pendingLeaves}</div>
        </motion.div>
        <motion.div
          className="p-4 bg-purple-500 text-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaChartBar className="text-3xl mb-2" />
          <div className="text-lg font-semibold">Attendance Rate</div>
          <div className="text-2xl">{stats.attendanceRate}%</div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Overview */}
        <AttendanceChart />

        {/* Department Breakdown */}
        <DepartmentChart />
      </div>

      {/* Latest Leave Requests */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold mb-2"
        >
          Recent Leave Requests
        </motion.div>
        <div className="overflow-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Department</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-100">
                  <td className="p-4">{leave.employeeName}</td>
                  <td className="p-4">{leave.department}</td>
                  <td className="p-4">{leave.startDate}</td>
                  <td className="p-4">{leave.endDate}</td>
                  <td className="p-4">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
