import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../../services/api"; // Your axios instance

const EmployeeEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the employee ID from the URL

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the employee data when the component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/employees/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Could not load employee data.");
      }
    };
    fetchEmployee();
  }, [id]);

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
    if (!formData.name || !formData.email || !formData.department || !formData.position) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Make API request to update the employee
      const response = await axios.put(`/employees/${id}`, formData);
      if (response.status === 200) {
        navigate("/employees"); // Redirect to employee list after successful update
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("An error occurred while updating the employee.");
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
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="johndoe@example.com"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="department">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="position">
            Position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Software Engineer"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main St, City, Country"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition"
          >
            {loading ? "Updating Employee..." : "Update Employee"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmployeeEditForm;
