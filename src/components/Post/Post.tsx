import React from "react";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import {
  PostParams,
  ProfileSectionParams,
  ReactionSectionProps,
} from "../../interfaces/Posts";
import { useNavigate } from "react-router-dom";

const ProfileSection: React.FC<ProfileSectionParams> = ({
  profileImage,
  profileName,
}) => (
  <div className="flex items-start p-6">
    <div className="mr-4 flex-shrink-0">
      <img
        src={profileImage}
        alt="Profile"
        className="h-[50px] w-[50px] rounded-full"
      />
    </div>
    <div>
      <div className="font-bold">{profileName}</div>
    </div>
  </div>
);

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
  id,
  creatorId,
  content,
  imageURL,
  profileSection,
  isDetail,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-lg bg-white ${
        isDetail ? "" : "shadow-md"
      }`}
    >
      <ProfileSection
        profileImage={profileSection.profileImage}
        profileName={profileSection.profileName}
      />
      {/* Post Content */}
      <div className="text-center">
        <p className="mb-2 ml-5 text-left text-lg font-semibold">{content}</p>
        <img
          src={imageURL}
          alt="Post Content"
          className={`h-[300px] w-full ${isDetail ? "" : "rounded-lg"}`}
        />
      </div>

      <ReactionSection handleClick={handleClick} />
    </div>
  );
};

export default Post;
