import React from "react";

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-1.1 1.1l.27.28v.79l5 4.99L20.49 19l-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
    />
  </svg>
);
