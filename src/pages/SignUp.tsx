import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { registerUserThunk } from "../features/authSlice";
import { AppDispatch } from "../app/store";
import SignupSuccess from "./SignupSuccess";

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
  });

  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "password") {
      setPasswordValidations({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&]/.test(value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setError("Name cannot be empty.");
      return;
    }

    if (!passwordRegex.test(formData.password || "")) {
      setError("Password does not meet the complexity requirements.");
      return;
    }

    setError(null);

    try {
      const resultAction = await dispatch(registerUserThunk(formData));

      if (registerUserThunk.fulfilled.match(resultAction)) {
        console.log("User registered successfully:", resultAction.payload);
        setNotification("Account created successfully!");
        setIsModalOpen(true); // Open the modal
        setTimeout(() => {
          navigate("/"); // Navigate to login page after a short delay
        }, 2000); // 2 seconds delay for the notification to be visible
      } else {
        console.error("Failed to register:", resultAction.payload);
        setError(resultAction.payload);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-yellow-100">
      <div className="absolute left-0 top-0 m-4 flex items-center">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="ml-2 text-2xl font-bold">BuZzNet</span>
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Sign up to BuZzNet
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Join the Buzz, Share the Moment
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
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
              placeholder="yourname@example.com"
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
            <div className="mt-2 text-xs text-gray-600">
              <ul>
                <li className={passwordValidations.length ? "text-green-600" : "text-red-600"}>
                  At least 8 characters
                </li>
                <li className={passwordValidations.uppercase ? "text-green-600" : "text-red-600"}>
                  At least one uppercase letter
                </li>
                <li className={passwordValidations.lowercase ? "text-green-600" : "text-red-600"}>
                  At least one lowercase letter
                </li>
                <li className={passwordValidations.number ? "text-green-600" : "text-red-600"}>
                  At least one number
                </li>
                <li className={passwordValidations.specialChar ? "text-green-600" : "text-red-600"}>
                  At least one special character (@$!%*?&)
                </li>
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            Create an Account
          </button>
          <p className="mt-2 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="cursor-pointer font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Modal for Notification */}
      <SignupSuccess
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={notification || ""}
      />
    </div>
  );
};

export default Signup;
