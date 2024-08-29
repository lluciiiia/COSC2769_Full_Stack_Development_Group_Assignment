import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(result)) {
      // Navigate to the home page after successful login
      navigate(`/home/${result.payload.user.id}`);
    } else {
      console.error('Login failed:', result.payload || 'Unknown error');
      // Optionally, you can display an error message to the user here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 relative">
      {/* Logo and BuZzNet Text */}
      <div className="absolute top-0 left-0 m-4 flex items-center">
        <img src={logo} alt="BuZzNet Logo" className="h-12" />
        <span className="text-2xl font-bold ml-2">BuZzNet</span>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Log In to BuZzNet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm font-bold hover:bg-gray-800"
          >
            Log In
          </button>
        </form>
      </div>

      {/* Sign Up Button */}
      <div className="absolute top-4 right-4">
        <button className="border-2 border-black text-black py-2 px-4 rounded-md font-bold hover:bg-gray-100">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
