import React, { useState, useEffect } from "react";
import { ReactionSectionProps } from "../../interfaces/Posts";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import { ReactionIcons } from "../../interfaces/Reactions";

export const ReactionSection: React.FC<ReactionSectionProps> = ({
  handleClick,
  onReact,
  initialReaction,
  isReacted,
  reactions,
  commentCount,
}) => {
  const [liked, setLiked] = useState(isReacted);
  const [showReactions, setShowReactions] = useState(false);
  const [reactionType, setReactionType] = useState(initialReaction || "REACT");

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleReactionClick = (reaction: string) => {
    setLiked(true);
    setReactionType(reaction);
    onReact(reaction);
    setShowReactions(false);
  };

  const renderReactionIcon = () => {
    const reactionDisplay = {
      LIKE: {
        icon: <LikeIcon className="h-5 w-5" fill="currentColor" />,
        label: "Liked",
        color: "text-blue-500",
      },
      LOVE: { icon: "❤️", label: "Loved", color: "text-red-500" },
      HAHA: { icon: "😊", label: "Funny", color: "text-orange-500" },
      ANGRY: { icon: "😡", label: "Angry", color: "text-red-500" },
      REACT: {
        icon: <LikeIcon className="h-5 w-5" fill="currentColor" />,
        label: "React",
        color: "text-gray-500",
      },
    };

    const { icon, label, color } =
      reactionDisplay[reactionType] || reactionDisplay.REACT;

    return (
      <button
        onClick={handleLikeClick}
        className={`flex items-center space-x-2 rounded px-3 py-1 ${
          liked ? color : "text-gray-500"
        } hover:bg-blue-100`}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span>{label}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="relative">
      <div
        className="flex justify-between p-4"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        {renderReactionIcon()}

        <div className="flex flex-col items-center">
          {commentCount > 0 && (
            <div className="mb-1 ml-6 text-sm text-gray-600">
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </div>
          )}
          <button
            onClick={handleClick}
            className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
          >
            <CommentIcon />
            <span>Comment</span>
          </button>
        </div>
      </div>
      {showReactions && (
        <div
          className="absolute left-0 flex space-x-2 rounded-lg bg-white p-2 shadow-lg"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {Object.entries(ReactionIcons).map(([reaction, icon]) => (
            <button
              key={reaction}
              onClick={() => handleReactionClick(reaction)}
              className="rounded p-2 hover:bg-gray-200"
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
