import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleGoHome = () => {
    navigate("/dashboard"); // Navigate to the dashboard or home page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Oops!</h2>
        <p className="text-xl text-gray-700 mb-4">
          Something went wrong or this page does not exist.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
