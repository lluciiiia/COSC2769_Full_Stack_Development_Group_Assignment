import React, { useState, useEffect } from "react";
import { ReactionSectionProps } from "../../interfaces/Posts";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";

export const ReactionSection: React.FC<ReactionSectionProps> = ({
  handleClick,
  onReact,
  initialReaction,
  isReacted,
  commentCount
}) => {
  const [liked, setLiked] = useState(isReacted);
  const [showReactions, setShowReactions] = useState(false);
  const [reactionType, setReactionType] = useState(initialReaction);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleReactionClick = (reaction: string) => {
    setLiked(true);
    setReactionType(reaction);
    onReact(reaction);
    setShowReactions(false);
  };

  const keepReactionsVisible = () => {
    setShowReactions(true);
  };

  const hideReactions = () => {
    setShowReactions(false);
  };

  const renderReactionIcon = () => {
    switch (reactionType) {
      case "LIKE":
        return (
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 rounded px-3 py-1 ${
              liked ? "text-blue-500" : "text-gray-500"
            } hover:bg-blue-100`}
          >
            <div className="flex items-center space-x-2">
              <LikeIcon className="h-5 w-5" fill="currentColor" />
              <span>Liked</span>
            </div>
          </button>
        );
      case "LOVE":
        return (
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 rounded px-3 py-1 ${
              liked ? "text-red-500" : "text-gray-500"
            } hover:bg-blue-100`}
          >
            <div className="flex items-center space-x-2">
              <span>❤️</span>
              <span>Loved</span>
            </div>
          </button>
        );
      case "HAHA":
        return (
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 rounded px-3 py-1 ${
              liked ? "text-orange-500" : "text-gray-500"
            } hover:bg-blue-100`}
          >
            <div className="flex items-center space-x-2">
              <span>😊</span>
              <span>Funny</span>
            </div>
          </button>
        );
      case "ANGRY":
        return (
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 rounded px-3 py-1 ${
              liked ? "text-red-500" : "text-gray-500"
            } hover:bg-blue-100`}
          >
            <div className="flex items-center space-x-2">
              <span>😡</span>
              <span>Angry</span>
            </div>
          </button>
        );
      default:
        return (
          <button
            onClick={handleLikeClick}
            className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-blue-100"
          >
            <LikeIcon className="h-5 w-5" fill="currentColor" />
            <span>React</span>
          </button>
        );
    }
  };

  return (
    <div className="relative">
  <div
    className="flex justify-between p-4"
    onMouseEnter={keepReactionsVisible}
    onMouseLeave={hideReactions}
  >
    {renderReactionIcon()}

    <div className="flex flex-col items-center">
      {/* Display comment count above the comment button */}
      {commentCount > 0 && (
        <div className="mb-1 text-sm text-gray-600 ml-6">
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
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
          onMouseEnter={keepReactionsVisible}
          onMouseLeave={hideReactions}
        >
          <button
            onClick={() => handleReactionClick("LIKE")}
            className="rounded p-2 hover:bg-gray-200"
          >
            👍
          </button>
          <button
            onClick={() => handleReactionClick("LOVE")}
            className="rounded p-2 hover:bg-gray-200"
          >
            ❤️
          </button>
          <button
            onClick={() => handleReactionClick("HAHA")}
            className="rounded p-2 hover:bg-gray-200"
          >
            😄
          </button>
          <button
            onClick={() => handleReactionClick("ANGRY")}
            className="rounded p-2 hover:bg-gray-200"
          >
            😡
          </button>
        </div>
      )}
    </div>
  );
};
