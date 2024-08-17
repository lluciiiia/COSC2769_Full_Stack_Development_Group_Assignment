import React from "react";
import { LikeIcon } from "../assets/icons/LikeIcon";
import { CommentIcon } from "../assets/icons/CommentIcon";

interface PostParams {
  profileImage: string;
  profileName: string;
  postContent: string;
  postImage: string;
  profileLink: string;
}
interface ProfileSectionParams {
  profileImage: string;
  profileName: string;
  profileLink: string;
}

const ProfileSection: React.FC<ProfileSectionParams> = ({
  profileImage,
  profileName,
  profileLink,
}) => (
  <div className="flex items-start p-6">
    <div className="flex-shrink-0 mr-4">
      <img
        src={profileImage}
        alt="Profile"
        className="rounded-full h-[50px] w-[50px]"
      />
    </div>
    <div>
      <div className="font-bold">{profileName}</div>
      <a
        href={profileLink}
        className="text-gray-500 hover:underline text-sm mt-1"
      >
        @{profileName}
      </a>
    </div>
  </div>
);

const ReactionSection: React.FC = () => (
  <div className="flex justify-between p-4">
    <button className="flex items-center space-x-2 text-gray-500 hover:bg-blue-100 rounded px-3 py-1">
      <LikeIcon className="w-5 h-5" fill="currentColor" />
      <span>Like</span>
    </button>
    <button className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 rounded px-3 py-1">
      <CommentIcon />
      <span>Comment</span>
    </button>
  </div>
);

const Post: React.FC<PostParams> = ({
  profileImage,
  profileName,
  postContent,
  postImage,
  profileLink,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
      <ProfileSection
        profileImage={profileImage}
        profileName={profileName}
        profileLink={profileLink}
      />
    {/* Post Content */}
      <div className="text-center">
        <p className="text-lg text-left font-semibold mb-2 ml-5">
          {postContent}
        </p>
        <img
          src={postImage}
          alt="Post Content"
          className="w-full rounded-lg h-[300px]"
        />
      </div>

      <ReactionSection />
    </div>
  );
};

export default Post;
