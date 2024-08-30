import React from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../features/authSlice"; // Import the logout thunk
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
interface ProfileButtonModalProps {
  isOpen: boolean;
}

const ProfileButtonModal: React.FC<ProfileButtonModalProps> = ({ isOpen }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk());
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-14 right-6 z-50 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Profile Menu</h2>
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default ProfileButtonModal;
