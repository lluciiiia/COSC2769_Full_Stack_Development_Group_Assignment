import logo from "../assets/icons/logo.png";
import notificationIcon from "../assets/icons/notificationIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import createPostIcon from "../assets/icons/createPostIcon.png";

// ------------------------------------------------------

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#FFC123] p-2">
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

      <div className="mr-6 flex justify-between gap-5">
        <NavItem src={notificationIcon} label={"Notification"} />
        <NavItem src={profileIcon} label={"Profile"} />
      </div>
    </nav>
  );
};
export default Navbar;

const NavItem = ({ src, label }: { src: string; label: string }) => (
  <div className="flex w-full flex-1 cursor-pointer flex-col items-center hover:underline focus:outline-none">
    <img src={src} alt={`${label} icon`} className="h-6" />
    <p>{label}</p>
  </div>
);
