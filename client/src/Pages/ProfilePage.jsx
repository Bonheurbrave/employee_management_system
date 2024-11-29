import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEdit, AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch admin data from the API
    fetch('http://localhost:5000/api/admins')
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">No admin data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        {/* Profile Picture */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {admin.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">Admin Profile</h1>
        <p className="text-center text-gray-500 mb-4">Manage your account details</p>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800 text-sm break-all">{admin.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Username:</span>
            <span className="text-gray-800">{admin.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Password:</span>
            <span className="text-gray-800">{admin.password}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center mt-6 space-x-4">
          <button
             onClick={()=>{navigate(`/profile/edit/${admin._id}`)}}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            <AiOutlineEdit className="mr-2" />
            Edit Info
          </button>
          <button
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
          >
            <AiOutlineSetting className="mr-2" />
            Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
