import React, { useState } from "react";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import {
  PostParams,
  ProfileSectionParams,
  ReactionSectionProps,
} from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";
import PostDropDown from "./PostDropDown";
import { deletePostById } from "../../controllers/posts";

const ProfileSection: React.FC<ProfileSectionParams> = ({
  profileImage,
  profileName,
  postId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    setIsDropdownOpen(false);
    try {
      const response = await deletePostById(postId);
      if (!response) {
        alert("Failed to delete the post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while trying to delete the post.");
    }
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
          <PostDropDown onEdit={handleEdit} onDelete={handleDelete} />
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
      <ProfileSection
        profileImage={profileImage}
        profileName={profileName}
        postId={_id}
      />
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
