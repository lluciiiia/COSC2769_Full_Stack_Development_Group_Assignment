import React from "react";

interface NavItemProps {
  src: string;
  label: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ src, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex w-full flex-1 cursor-pointer flex-col items-center transition-all duration-300 ease-in-out hover:scale-110 hover:underline focus:outline-none"
  >
    <img src={src} alt={`${label} icon`} className="h-6" />
    <p>{label}</p>
  </div>
);
