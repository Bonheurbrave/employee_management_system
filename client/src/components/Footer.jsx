import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Social Media Icons from React Icons

const Footer = () => {
  return (
    <div className="bg-blue-800 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Footer Links */}
        <div className="flex space-x-6">
          <a href="/" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-gray-300">
            Terms of Service
          </a>
          <a href="/" className="hover:text-gray-300">
            About Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaLinkedinIn size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} Employee Management System. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
