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
  setIsOpen: (a: boolean) => void;
}

const ProfileButtonModal: React.FC<ProfileButtonModalProps> = ({
  isOpen,
  setIsOpen,
  imgUrl,
  name,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector(selectAuthState);

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
    setIsOpen(false);
    window.location.reload();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed right-6 top-16 z-50 w-56 cursor-pointer rounded-md bg-gray-100 p-4 shadow-md">
      <div
        className="flex transform items-center gap-2 transition-transform hover:opacity-20"
        onClick={handleClick}
      >
        <img
          src={imgUrl}
          alt="Profile"
          className="h-[50px] w-[50px] transform rounded-full transition-transform"
        />
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileButtonModal;
