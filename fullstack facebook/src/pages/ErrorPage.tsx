import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 text-center">
      {/* Logo and BuZzNet Text */}
      <div className="flex items-center mb-8">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="text-3xl font-bold ml-2">BuZzNet</span>
      </div>

      {/* Error Message */}
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! The page you’re looking for doesn’t exist.</p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-black text-white py-2 px-4 rounded-md font-bold hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
