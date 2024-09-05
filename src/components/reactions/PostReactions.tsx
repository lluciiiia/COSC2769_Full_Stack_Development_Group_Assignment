import React, { useState, useEffect } from "react";
import { ReactionIcons, PostReactionsProps } from "../../interfaces/Reactions";
import ReactionIconButton from "./ReactionIconButton";
import { ReactionIconsWithText } from "../../interfaces/Reactions";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/authSlice";

export const PostReactions: React.FC<PostReactionsProps> = ({
  handleClick,
  onReact,
  initialReaction = "REACT",
  reactions = [],
  commentCount,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(initialReaction);
  const { id: userId } = useSelector(selectAuthState);
  const [isReacted, setIsReacted] = useState(initialReaction !== "REACT");
  const [displayedReactions, setDisplayedReactions] = useState<string[]>([]);
  const [totalReaction, setTotalReaction] = useState(reactions.length);

  useEffect(() => {
    // Calculate unique reactions
    const uniqueReactions = Array.from(
      new Set(reactions.map((reaction) => ReactionIcons[reaction.reactionType]))
    ).slice(0, 3);

    // Update displayed reactions if different
    setDisplayedReactions(prev => {
      const newDisplay = uniqueReactions;
      return newDisplay.join() === prev.join() ? prev : newDisplay;
    });

    // Update total reaction count if different
    setTotalReaction(prev => reactions.length !== prev ? reactions.length : prev);

    // Check if the user has reacted
    const userReaction = reactions.find(
      (reaction) => reaction.userId && reaction.userId.toString() === userId
    );

    if (userReaction) {
      setSelectedReaction(prev => userReaction.reactionType !== prev ? userReaction.reactionType : prev);
      setIsReacted(prev => true);
    } else {
      setSelectedReaction(prev => "REACT" !== prev ? "REACT" : prev);
      setIsReacted(prev => false);
    }
  }, [reactions, userId]);

  const handleReactionClick = (reaction: string) => {
    if (isReacted && selectedReaction === reaction) {
      setIsReacted(false);
      setSelectedReaction("REACT");
      onReact("UNDO_REACT");

      // Remove the reaction from displayed reactions
      setDisplayedReactions(prevReactions =>
        prevReactions.filter(r => r !== ReactionIcons[reaction])
      );
      setTotalReaction(prev => prev - 1);
    } else if (isReacted && selectedReaction !== reaction) {
      setSelectedReaction(reaction);
      onReact(reaction);

      // Update displayed reactions by replacing the old reaction
      setDisplayedReactions(prevReactions => {
        const updatedReactions = prevReactions.map(r =>
          r === ReactionIcons[selectedReaction] ? ReactionIcons[reaction] : r
        );
        return Array.from(new Set(updatedReactions)).slice(0, 3);
      });
    } else {
      setIsReacted(true);
      setSelectedReaction(reaction);
      onReact(reaction);

      // Add new reaction to displayed reactions
      setDisplayedReactions(prevReactions => {
        const updatedReactions = [ReactionIcons[reaction], ...prevReactions];
        return Array.from(new Set(updatedReactions)).slice(0, 3);
      });
      setTotalReaction(prev => prev + 1);
    }
    setShowReactions(false);
  };

  const handleCommentClick = () => {
    if (!isReacted && selectedReaction === "REACT") {
      onReact(selectedReaction);
    }
    handleClick();
  };

  return (
    <div className="relative flex flex-col">
      <div className="ml-auto mt-8 pr-8 text-sm text-gray-600">
        {commentCount} {commentCount === 1 ? "comment" : "comments"}
      </div>

      <div className="flex items-center space-x-2 p-4">
        <div className="flex -space-x-1">
          {displayedReactions.map((icon, index) => (
            <span key={index} className="inline-flex items-center">
              <span>{icon}</span>
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{totalReaction}</span>
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
              icon={ReactionIconsWithText[selectedReaction] || "REACT"}
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
