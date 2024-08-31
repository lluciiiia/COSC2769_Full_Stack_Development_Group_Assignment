import React from "react";
import DefaultProfile from "../../assets/icons/DefaultProfile";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/authSlice";
const ProfileHeader = ({
  name,
  bio,
  avatar,
  friends,
  handleEditProfile,
  isAuthenticatedUser,
}) => {
  const { id } = useSelector(selectAuthState);

  const isFriend = friends.some((f) => f._id == id);

  return (
    <div className="relative h-64 w-full bg-gray-200 bg-cover bg-center">
      <div className="absolute -bottom-16 left-10">
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg transition-opacity duration-200 hover:opacity-80"
          />
        ) : (
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg">
            <DefaultProfile />
          </div>
        )}
        {isAuthenticatedUser && (
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100">
            <span className="text-white">Edit Image</span>
          </div>
        )}
      </div>
      <div className="absolute -bottom-14 left-44">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm">{bio}</p>
      </div>
      {isAuthenticatedUser ? (
        <button
          onClick={handleEditProfile}
          className="absolute -bottom-14 right-5 rounded-md border border-black bg-white px-4 py-2 text-gray-800 shadow hover:bg-gray-100"
        >
          Edit Profile
        </button>
      ) : isFriend ? (
        <button className="absolute -bottom-14 right-5 rounded-md border bg-[#FFC123] px-4 py-2 text-gray-800 shadow hover:opacity-20">
          Unfriend
        </button>
      ) : (
        <button className="absolute -bottom-14 right-5 rounded-md border bg-[#FFC123] px-4 py-2 text-gray-800 shadow hover:opacity-20">
          Add Friend
        </button>
      )}
    </div>
  );
};
export default ProfileHeader;
