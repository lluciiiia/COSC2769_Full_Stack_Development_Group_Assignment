import React from "react";
import { useDispatch } from "react-redux";
import { logoutUserThunk, fetchSess } from "../features/authSlice"; // Import the logout thunk
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
interface ProfileButtonModalProps {
  isOpen: boolean;
  name: string;
  imgUrl: string;
}

const ProfileButtonModal: React.FC<ProfileButtonModalProps> = ({
  isOpen,
  name,
  imgUrl,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(selectAuthState);
  const { id } = authState;
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk());
      dispatch(fetchSess);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed right-6 top-16 z-50 rounded-md bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold">Profile Menu</h2>
      <img
        src={imgUrl}
        alt="Profile"
        className="h-[40px] w-[40px] rounded-full"
      />
      <button
        onClick={handleLogout}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
      <button
        onClick={handleClick}
        className="bg-white-500 mt-4 rounded px-4 py-2 text-black"
      >
        Profile
      </button>
    </div>
  );
};

export default ProfileButtonModal;
