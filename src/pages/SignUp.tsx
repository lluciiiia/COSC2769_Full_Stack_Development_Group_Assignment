import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { registerUser } from "../controllers/authentications";
// import { UseDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
interface RegisInfor {
  name?: string;
  email?: string;
  password?: string;
}
const Signup: React.FC = () => {
  const [formData, setFormData] = useState<RegisInfor>({
    name: "",
    email: "",
    password: "",
    // Add any other fields you may need
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Update the corresponding field in formData
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch the registerUser thunk
      const resultAction = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(resultAction)) {
        console.log("User registered successfully:", resultAction.payload);
        navigate("/");
      } else {
        console.error("Failed to register:", resultAction.payload);
        // Handle registration error
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            Create an Account
          </button>
          <p className="mt-2 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="cursor-pointer font-bold">Login</Link>
          </p>
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
