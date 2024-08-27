import React from "react";

const ProfileHeader = ({ name, bio, avatar, handleEditProfile }) => {
  const defaultAvatar = "https://via.placeholder.com/150";
  return (
    <div
      className="relative h-64 w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1200x300')",
      }}
    >
      <div className="absolute -bottom-16 left-10">
        <img
          src={avatar ? avatar : defaultAvatar}
          alt="Profile"
          className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="absolute -bottom-14 left-44">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm">{bio}</p>
      </div>
      <button
        onClick={handleEditProfile}
        className="absolute -bottom-14 right-5 rounded border border-black bg-white px-4 py-2 text-gray-800 shadow hover:bg-gray-100"
      >
        Edit Profile
      </button>
    </div>
  );
};
export default ProfileHeader;
