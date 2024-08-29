import React from "react";
import DefaultProfile from "../../assets/icons/DefaultProfile";

const ProfileHeader = ({ name, bio, avatar, handleEditProfile }) => {
  const defaultBGImg = "url('https://via.placeholder.com/1200x300')";
  return (
    <div
      className="relative h-64 w-full bg-cover bg-center"
      style={{
        backgroundImage: defaultBGImg,
      }}
    >
      <div className="absolute -bottom-16 left-10">
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
          />
        ) : (
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg">
            <DefaultProfile />
          </div>
        )}
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
