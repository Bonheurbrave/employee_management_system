import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import axios from "../../../services/api"; // Your axios instance
import axios from 'axios'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the list of departments
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("An error occurred while fetching departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await axios.delete(`/departments/${id}`);
        if (response.status === 200) {
          setDepartments(departments.filter((department) => department.id !== id));
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        setError("An error occurred while deleting the department.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Add Department Button */}
      <div className="mb-4">
        <Link
          to="/departments/add"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition"
        >
          Add New Department
        </Link>
      </div>

      {/* Department List Table */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Department Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id} className="border-b">
                <td className="px-4 py-2">{department.name}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/departments/edit/${department.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default DepartmentList;
