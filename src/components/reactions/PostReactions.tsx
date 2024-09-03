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
  reactions = [],
  commentCount,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    ReactionIcons[initialReaction] ? initialReaction : "REACT"
  );
  const [isReacted, setIsReacted] = useState(initialIsReacted);

  const handleReactionClick = (reaction: string) => {
    setIsReacted(true);
    setSelectedReaction(reaction);
    onReact(reaction);
    setShowReactions(false);
  };

  const handleCommentClick = () => {
    if (!isReacted && selectedReaction === "REACT") {
      onReact(selectedReaction);
    }
    handleClick();
  };

  // Count reactions by type
  const reactionCounts = reactions.reduce((acc, reaction) => {
    acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get unique reactions for display
  const uniqueReactions = Array.from(new Set(reactions.map((r) => r.reactionType)))
    .slice(0, 3)
    .map((reactionType) => ({
      type: reactionType,
      icon: ReactionIcons[reactionType],
      count: reactionCounts[reactionType],
    }));

  const totalReactions = reactions.length;

  return (
    <div className="relative flex flex-col">
      <div className="ml-auto mt-8 pr-8 text-sm text-gray-600">
        {commentCount} {commentCount === 1 ? "comment" : "comments"}
      </div>

      <div className="flex items-center space-x-2 p-4">
        <div className="flex -space-x-1">
          {uniqueReactions.map(({ type, icon, count }) => (
            <span key={type} className="inline-flex items-center space-x-1">
              <span>{icon}</span>
              <span className="text-sm text-gray-600">{count}</span>
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{totalReactions}</span>
      </div>

      <div
        className="flex justify-between p-4"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <div className="relative">
          {selectedReaction === "REACT" ? (
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="py-1 hover:bg-gray-200 flex items-center space-x-2 rounded px-3"
              aria-label="React"
            >
              <div className="flex items-center space-x-2">
                <LikeIcon className="h-5 w-5" fill="currentColor" />
                <span>React</span>
              </div>
            </button>
          ) : (
            <ReactionIconButton
              reactionType={selectedReaction}
              isSelected={isReacted}
              onClick={() => setShowReactions(!showReactions)}
              icon={ReactionIcons[selectedReaction] || "REACT"}
            />
          )}

          {showReactions && (
            <div
              className="absolute flex space-x-2 rounded-lg bg-white p-2 shadow-lg bottom-full mb-2"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              role="menu"
            >
              {Object.entries(ReactionIcons).map(([reaction, icon]) => (
                <ReactionIconButton
                  key={reaction}
                  reactionType={reaction}
                  isSelected={selectedReaction === reaction}
                  onClick={() => handleReactionClick(reaction)}
                  icon={icon}
                  aria-label={`React with ${reaction}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleCommentClick}
            className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Comment"
          >
            <CommentIcon />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
