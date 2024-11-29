import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineTeam, AiOutlineDashboard, AiOutlineSecurityScan } from 'react-icons/ai';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      {/* Header Section */}
      <header className="bg-white shadow-md text-gray-800">
      </header>

      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Simplify Employee Management
          </h1>
          <p className="text-lg lg:text-xl font-light mb-6">
            Empower your business with streamlined employee management solutions.
          </p>
          <a
            href="#features"
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <AiOutlineTeam className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Organize and track employee information efficiently with an intuitive interface.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <AiOutlineDashboard className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Dashboard</h3>
              <p className="text-gray-600">
                Get insights into workforce performance with a robust dashboard.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <AiOutlineSecurityScan className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Protect employee data with industry-leading security protocols.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Why Choose EmployeeHub?</h2>
            <p className="text-lg font-light mb-6">
              EmployeeHub provides a seamless, user-friendly platform for managing your workforce,
              empowering your HR team to focus on what matters most—your employees.
            </p>
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-400 mt-4">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg font-light mb-6">
            Have questions? Reach out to our team for assistance.
          </p>
          <a
            href="mailto:bonheurbrave1@gmail.com"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
