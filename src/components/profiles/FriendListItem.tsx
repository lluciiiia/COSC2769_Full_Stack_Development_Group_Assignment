import React, { useState } from "react";
import ProfileFriendDropDownList from "./ProfileFriendDropDownList";

export const FriendListItem = ({
  _id,
  avatar,
  userName,
  isAuthenticatedUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="h-14 w-14 rounded-full border-4 border-black shadow-lg"
          src={avatar}
          alt={_id}
        />
        <p className="font-bold">{userName}</p>
      </div>

      <div className="mt-0 text-2xl font-bold">
        <svg
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {isDropdownOpen && (
          <ProfileFriendDropDownList
            friendId={_id}
            isAuthenticatedUser={isAuthenticatedUser}
          />
        )}
      </div>
    </div>
  );
};
