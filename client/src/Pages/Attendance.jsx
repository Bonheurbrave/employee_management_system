import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import axios from "../../../services/api"; // Your axios instance
import axios from "axios";

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState(""); // For filtering by date

  // Fetch attendance records and employee data
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [attendanceResponse, employeesResponse] = await Promise.all([
          axios.get("/attendance"),
          axios.get("/employees"),
        ]);

        setAttendanceRecords(attendanceResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("An error occurred while fetching attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleMarkAttendance = async (employeeId, status) => {
    try {
      const response = await axios.post("/attendance", {
        employeeId,
        status,
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      });

      if (response.status === 200) {
        setAttendanceRecords([...attendanceRecords, response.data]);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      setError("An error occurred while marking attendance.");
    }
  };

  // Filter attendance records by date
  const filteredRecords = dateFilter
    ? attendanceRecords.filter((record) =>
        record.date.includes(dateFilter)
      )
    : attendanceRecords;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Filter by Date */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="dateFilter">
          Filter by Date
        </label>
        <input
          type="date"
          id="dateFilter"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

          {/* Employee Attendance Marking */}
          <table className="min-w-full table-auto mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleMarkAttendance(employee.id, "Present")}
                      className="text-green-500 hover:text-green-700 mr-4"
                    >
                      Mark Present
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(employee.id, "Absent")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Mark Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

          {/* Attendance Records Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No records found</td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="px-4 py-2">
                      {employees.find((emp) => emp.id === record.employeeId)?.name}
                    </td>
                    <td className="px-4 py-2">{record.status}</td>
                    <td className="px-4 py-2">{record.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </motion.div>
  );
};

export default AttendancePage;
