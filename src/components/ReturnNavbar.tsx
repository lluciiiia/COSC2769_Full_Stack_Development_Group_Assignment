import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import React from "react";

export default function ReturnNavbar() {
  return (
    <div>
      <nav className="left-0 right-0 top-0 flex items-center bg-black p-4">
        <Link to="/" className="flex items-center text-white">
          <FaArrowLeft className="mr-2" />
          <span className="text-lg font-bold hover:underline">Return</span>
        </Link>
      </nav>
    </div>
  );
}
