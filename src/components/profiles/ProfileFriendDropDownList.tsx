import React from "react";

const ProfileFriendDropDownList = ({ setIsDropdownOpen }) => {
  return (
    <div className="relative">
      <div className="absolute right-0 w-36 rounded-md bg-white shadow-xl">
        <>
          <button
            // onClick={onEdit}
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 first:rounded-t-md hover:bg-gray-100"
          >
            View Profile
          </button>
          <button
            // onClick={handleDeleteClick}
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 last:rounded-b-md hover:bg-gray-100"
          >
            Unfriend
          </button>
        </>
      </div>
    </div>
  );
};
export default ProfileFriendDropDownList;
