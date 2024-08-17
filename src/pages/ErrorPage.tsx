import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-100 text-center">
      {/* Logo and BuZzNet Text */}
      <div className="mb-8 flex items-center">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="ml-2 text-3xl font-bold">BuZzNet</span>
      </div>

      {/* Error Message */}
      <h1 className="mb-4 text-6xl font-bold text-black">404</h1>
      <p className="mb-8 text-xl text-gray-700">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
