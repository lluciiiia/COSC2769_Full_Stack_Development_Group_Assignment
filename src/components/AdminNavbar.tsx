import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import logo from "../assets/icons/logo.png";
import profileIcon from "../assets/icons/profileIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import postIcon from "../assets/icons/postIcon.png";
import { logoutUserThunk, fetchSess } from "../features/authSlice";

const AdminNavbar = ({
  setActiveTab,
}: {
  setActiveTab: (arg: string) => void;
}) => {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    navigate(`/home`);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk());
      await dispatch(fetchSess());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 z-10 flex w-[100%] items-center justify-between bg-[#FFC123] p-2 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="BuZzNet Logo"
          className="h-12 w-12 cursor-pointer object-contain"
          onClick={handleHomeClick}
        />
        <h1 className="text-2xl font-bold">BuZzNet</h1>
      </div>
      <div className="flex max-w-xs flex-1 flex-grow justify-around">
        <AdminNavItem
          src={groupIcon}
          label="Group"
          setActiveTab={setActiveTab}
          navigate={navigate} // Passing navigate as a prop to AdminNavItem
        />
        <AdminNavItem
          src={profileIcon}
          label="Users"
          setActiveTab={setActiveTab}
          navigate={navigate} // Passing navigate as a prop to AdminNavItem
        />
        <AdminNavItem
          src={postIcon}
          label="Content"
          setActiveTab={setActiveTab}
          navigate={navigate} // Passing navigate as a prop to AdminNavItem
        />
      </div>
      <button
        onClick={handleLogout}
        className="rounded-full bg-red-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;


interface AdminNavItemProps {
  src: string;
  label: string;
  setActiveTab: (arg: string) => void;
}
interface AdminNavItemProps {
  src: string;
  label: string;
  setActiveTab: (arg: string) => void;
  navigate: (arg: string) => void; // Add navigate as a prop
}

export const AdminNavItem: React.FC<AdminNavItemProps> = ({
  src,
  label,
  setActiveTab,
  navigate, // Destructure navigate from props
}) => (
  <div
    onClick={() => {
      if (setActiveTab) {
        setActiveTab(label);
      }
      navigate("/admin"); 
    }}
    className="flex w-full flex-1 cursor-pointer flex-col items-center transition-all duration-300 ease-in-out hover:scale-110 hover:underline focus:outline-none"
  >
    <img src={src} alt={`${label} icon`} className="h-6" />
    <p>{label}</p>
  </div>
);
