import React from "react";

import logo from "../assets/icons/logo.png";

const Signup: React.FC = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-yellow-100">
      {/* Logo and BuZzNet Text */}
      <div className="absolute left-0 top-0 m-4 flex items-center">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="ml-2 text-2xl font-bold">BuZzNet</span>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Sign up to BuZzNet
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Join the Buzz, Share the Moment
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-bold text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              placeholder="John"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            Create an Account
          </button>
        </form>
      </div>

      {/* Login Button */}
      <div className="absolute right-4 top-4">
        <button className="rounded-md border-2 border-black px-4 py-2 font-bold text-black hover:bg-gray-100">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Signup;
