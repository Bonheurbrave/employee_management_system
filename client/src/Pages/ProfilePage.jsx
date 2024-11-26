import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import axios from "../../../services/api"; // Your axios instance
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { employeeId } = useParams(); // Getting the employeeId from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  // Fetch employee data by employeeId
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/employees/${employeeId}`);
        setEmployee(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          department: response.data.department,
        });
      } catch (error) {
        setError("Error fetching employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/employees/${employeeId}`, formData);
      setEmployee(response.data);
      toast.success("Profile updated successfully!");
      setEditMode(false); // Switch back to view mode
    } catch (error) {
      setError("Error updating profile.");
      toast.error("Failed to update profile!");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>

      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold mb-2"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-semibold mb-2"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Name</h2>
            <p>{employee.name}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Email</h2>
            <p>{employee.email}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Role</h2>
            <p>{employee.role}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Department</h2>
            <p>{employee.department}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
