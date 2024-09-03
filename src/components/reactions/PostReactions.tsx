import React, { useState } from "react";
import { ReactionIcons, PostReactionsProps } from "../../interfaces/Reactions";
import ReactionIconButton from "./ReactionIconButton";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import { LikeIcon } from "../../assets/icons/LikeIcon";

export const PostReactions: React.FC<PostReactionsProps> = ({
  handleClick,
  onReact,
  initialReaction = "REACT",
  isReacted: initialIsReacted,
  reactions,
  commentCount,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    ReactionIcons[initialReaction] ? initialReaction : "REACT",
  );
  const [isReacted, setIsReacted] = useState(initialIsReacted);

  const handleReactionClick = (reaction: string) => {
    setIsReacted(true);
    setSelectedReaction(reaction);
    onReact(reaction);
    setShowReactions(false);
  };

  const defaultReactionButton = {
    icon: <LikeIcon className="h-5 w-5" fill="currentColor" />,
    label: "React",
    color: "text-gray-500",
  };

  return (
    <div className="relative z-10 flex flex-col">
      <div className="ml-auto mt-8 pr-8 text-sm text-gray-600">
        {commentCount} {commentCount === 1 ? "comment" : "comments"}
      </div>

      <div
        className="flex justify-between p-4"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        {selectedReaction === "REACT" ? (
          <button
            onClick={() => {}}
            className="py-1 hover:bg-gray-200 flex items-center space-x-2 rounded px-3"
            aria-label="React"
          >
            <div className="flex items-center space-x-2">
              {defaultReactionButton.icon}
              <span>{defaultReactionButton.label}</span>
            </div>
          </button>
        ) : (
          <ReactionIconButton
            reactionType={selectedReaction}
            isSelected={isReacted}
            onClick={() => {}}
            icon={ReactionIcons[selectedReaction] || "REACT"}
          />
        )}

        {/* Comment Button Always Visible */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Comment"
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
          role="menu"
        >
          {Object.entries(ReactionIcons).map(([reaction, icon]) => (
            <ReactionIconButton
              key={reaction}
              reactionType={reaction}
              isSelected={selectedReaction === reaction}
              onClick={handleReactionClick}
              icon={icon}
              aria-label={`React with ${reaction}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
