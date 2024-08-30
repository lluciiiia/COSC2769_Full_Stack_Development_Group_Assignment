import React from 'react';

export const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 19c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7H6v12zM9 3h6v1H9V3zm12 2h-3.5L15 3H9L8.5 5H5v2h14V5zm-7 4v10H8V9h4zM11 9h1v10h-1V9z"
    />
  </svg>
);
