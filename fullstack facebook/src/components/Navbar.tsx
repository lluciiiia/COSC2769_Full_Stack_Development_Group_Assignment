// IMAGE IMPORT
import logo from "../assets/logo.png";
import notificationIcon from "../assets/notificationIcon.png";
import profileLogo from "../assets/profileLogo.png";
import homeLogo from "../assets/homeLogo.png";
import groupLogo from "../assets/groupLogo.png";
import createPostLogo from "../assets/createPostLogo.png";

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

      <div className="flex max-w-xs flex-1 flex-grow justify-around gap-5">
        <NavItem src={homeLogo} label={"Home"} />
        <NavItem src={groupLogo} label="Group" />
        <NavItem src={createPostLogo} label="Create Post" />
      </div>

      <div className="mr-6 flex justify-between gap-5">
        <NavItem src={notificationIcon} label={"Notification"} />
        <NavItem src={profileLogo} label={"Profile"} />
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
