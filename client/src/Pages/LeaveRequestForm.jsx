import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import axios from "../../../services/api"; // Your axios instance
import axios from 'axios'

const LeaveRequestForm = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    employeeId: "", // This should be the logged-in employee's ID
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple form validation
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Send the leave request via POST request
      const response = await axios.post("/leave-requests", formData);
      if (response.status === 200) {
        navigate("/leave-requests"); // Redirect to leave requests list
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      setError("An error occurred while submitting your leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Leave Request</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="leaveType">
            Leave Type <span className="text-red-500">*</span>
          </label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Personal Leave">Personal Leave</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="startDate">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="endDate">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="reason">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Reason for leave"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition"
          >
            {loading ? "Submitting Request..." : "Submit Request"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LeaveRequestForm;
