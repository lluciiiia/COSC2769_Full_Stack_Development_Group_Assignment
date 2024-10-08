import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { AppDispatch } from "../app/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFailed, setIsLoginFailed] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(result)) {
      const user = result.payload.user;
      const isAdmin = user.isAdmin;

      if (isAdmin) {
        navigate(`/admin`);
      } else {
        navigate(`/home`);
        window.location.reload();
      }
    } else {
      console.error("Login failed:", result.payload || "Unknown error");

      if (result.payload === "Invalid credentials") {
        setIsLoginFailed("Invalid credentials");
      } else if (result.payload === "Your account is inactive") {
        setIsLoginFailed("Your account is inactive");
      } else {
        setIsLoginFailed("Login failed");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-yellow-100">
      {/* Logo and BuZzNet Text */}
      <div className="absolute left-0 top-0 m-4 flex items-center">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="ml-2 text-2xl font-bold">BuZzNet</span>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Log In to BuZzNet
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {loginFailed && <div className="text-red-400">{loginFailed}</div>}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-bold text-white hover:bg-gray-800"
          >
            Log In
          </button>
          <p className="mt-2 text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="sign-up" className="cursor-pointer font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
