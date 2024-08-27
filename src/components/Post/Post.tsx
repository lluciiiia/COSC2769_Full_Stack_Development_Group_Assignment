import React, { useState } from "react";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import {
  PostParams,
  ProfileSectionParams,
  ReactionSectionProps,
} from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";

const ProfileSection: React.FC<ProfileSectionParams> = ({
  profileImage,
  profileName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const safeProfileImage =
    profileImage !== undefined ? profileImage : "default-image-url.jpg";
  const safeProfileName = profileName !== undefined ? profileName : "Undefined";

  return (
    <div className="relative flex items-start p-6">
      <div className="mr-4 flex-shrink-0">
        <img
          src={safeProfileImage}
          alt="Profile"
          className="h-[50px] w-[50px] rounded-full"
        />
      </div>
      <div>
        <div className="font-bold">{safeProfileName}</div>
      </div>
      <div className="relative ml-auto">
        <img
          src="/src/assets/svgs/ThreeDots.svg"
          alt="Three dots"
          onClick={toggleDropdown}
          className="cursor-pointer"
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-28 rounded-md bg-white shadow-xl">
            <button
              onClick={() => console.log("Edit clicked")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => console.log("Delete clicked")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ReactionSection: React.FC<ReactionSectionProps> = ({ handleClick }) => (
  <div className="flex justify-between p-4">
    <button className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-blue-100">
      <LikeIcon className="h-5 w-5" fill="currentColor" />
      <span>Like</span>
    </button>
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
    >
      <CommentIcon />
      <span>Comment</span>
    </button>
  </div>
);

const Post: React.FC<PostParams> = ({
  _id,
  creatorId,
  content,
  imageURL,
  profileSection,
  isDetail,
}) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleClick = () => {
    navigate(`/posts/${userId}/${_id}`);
  };

  // Destructure with default values only if undefined
  const { profileImage = "default-image-url.jpg", profileName = "Undefined" } =
    profileSection || {}; // Fallback to an empty object if profileSection is undefined

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-lg bg-white ${
        isDetail ? "" : "shadow-md"
      }`}
    >
      <ProfileSection profileImage={profileImage} profileName={profileName} />
      {/* Post Content */}
      <div className="text-center">
        <p className="mb-2 ml-5 text-left text-lg font-semibold">{content}</p>
        {imageURL && ( // Conditional rendering for the image
          <img
            src={imageURL}
            alt="Post Content"
            className={`h-[300px] ${isDetail ? "w-[500px]" : "w-full rounded-lg"}`}
          />
        )}
      </div>

      <ReactionSection handleClick={handleClick} />
    </div>
  );
};

export default Post;
