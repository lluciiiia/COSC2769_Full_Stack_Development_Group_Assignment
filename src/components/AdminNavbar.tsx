import { useNavigate } from "react-router-dom";

import logo from "../assets/icons/logo.png";
import profileIcon from "../assets/icons/profileIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import postIcon from "../assets/icons/postIcon.png";

const AdminNavbar = ({
  setActiveTab,
}: {
  setActiveTab: (arg: string) => void;
}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/`);
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
        />
        <AdminNavItem
          src={profileIcon}
          label="Users"
          setActiveTab={setActiveTab}
        />
        <AdminNavItem
          src={postIcon}
          label="Content"
          setActiveTab={setActiveTab}
        />
      </div>
      <div></div>
    </nav>
  );
};
export default AdminNavbar;

interface AdminNavItemProps {
  src: string;
  label: string;
  setActiveTab: (arg: string) => void;
}

export const AdminNavItem: React.FC<AdminNavItemProps> = ({
  src,
  label,
  setActiveTab,
}) => (
  <div
    onClick={() => {
      if (setActiveTab) {
        setActiveTab(label);
      }
    }}
    className="flex w-full flex-1 cursor-pointer flex-col items-center hover:underline focus:outline-none"
  >
    <img src={src} alt={`${label} icon`} className="h-6" />
    <p>{label}</p>
  </div>
);
