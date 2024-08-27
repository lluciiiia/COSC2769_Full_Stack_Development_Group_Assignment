import React from "react";
import { ReactionSectionProps } from "../../interfaces/Posts";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";

export const ReactionSection: React.FC<ReactionSectionProps> = ({
  handleClick,
}) => (
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
