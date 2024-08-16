import logo from "../assets/icons/logo.png";
import notificationIcon from "../assets/icons/notificationIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import createPostIcon from "../assets/icons/createPostIcon.png";

// ------------------------------------------------------

const Navbar = () => {
  return (
    <nav className="p-2 flex  bg-[#FFC123] items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="BuZzNet Logo"
          className="h-12 w-12 object-contain"
        />
        <h1 className="text-2xl font-bold">BuZzNet</h1>
      </div>

      <div className="flex gap-5 justify-around flex-grow max-w-xs flex-1 ">
        <NavItem src={homeIcon} label={"Home"} />
        <NavItem src={groupIcon} label="Group" />
        <NavItem src={createPostIcon} label="Create Post" />
      </div>

      <div className="flex justify-between gap-5 mr-6">
        <NavItem src={notificationIcon} label={"Notification"} />
        <NavItem src={profileIcon} label={"Profile"} />
      </div>
    </nav>
  );
};
export default Navbar;

const NavItem = ({ src, label }: { src: string; label: string }) => (
  <div className="flex flex-col items-center w-full flex-1 cursor-pointer hover:underline focus:outline-none">
    <img src={src} alt={`${label} icon`} className="h-6" />
    <p>{label}</p>
  </div>
);
