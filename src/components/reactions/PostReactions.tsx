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
  const [selectedReaction, setSelectedReaction] = useState("REACT");
  const { id: userId } = useSelector(selectAuthState); // Get current userId from auth state
  const [isReacted, setIsReacted] = useState(false);
  const [displayedReactions, setDisplayedReactions] = useState<string[]>([]);
  const [totalReaction, setTotalReaction] = useState(reactions.length);

  useEffect(() => {
    // Update displayed reactions and total reaction count when 'reactions' prop changes
    const uniqueReactions = Array.from(
      new Set(reactions.map((reaction) => ReactionIcons[reaction.reactionType]))
    ).slice(0, 3);

    setDisplayedReactions(uniqueReactions);
    setTotalReaction(reactions.length);

    // Check if the user has already reacted
    const userReaction = reactions.find(
      (reaction) => reaction.userId && reaction.userId.toString() === userId
    );

    if (userReaction) {
      setSelectedReaction(userReaction.reactionType);
      setIsReacted(true);
    } else {
      setSelectedReaction("REACT");
      setIsReacted(false);
    }
  }, [reactions, userId]);

  const handleReactionClick = (reaction: string) => {
    if (isReacted && selectedReaction === reaction) {
      // Undo the reaction if the user clicks the same reaction
      setIsReacted(false);
      setSelectedReaction("REACT");
      onReact("UNDO_REACT");
  
      // Remove the reaction from displayed reactions
      setDisplayedReactions((prevReactions) =>
        prevReactions.filter((r) => r !== ReactionIcons[reaction])
      );
      setTotalReaction(totalReaction - 1);
    } else if (isReacted && selectedReaction !== reaction) {
      // Update the reaction if the user is changing their reaction
      setSelectedReaction(reaction);
      onReact(reaction);
  
      // Update displayed reactions by replacing the old reaction
      setDisplayedReactions((prevReactions) => {
        const updatedReactions = prevReactions.map((r) =>
          r === ReactionIcons[selectedReaction] ? ReactionIcons[reaction] : r
        );
        return Array.from(new Set(updatedReactions)).slice(0, 3);
      });
    } else {
      // Add new reaction if the user hasn't reacted yet
      setIsReacted(true);
      setSelectedReaction(reaction);
      onReact(reaction);
  
      // Add new reaction to displayed reactions
      setDisplayedReactions((prevReactions) => {
        const updatedReactions = [ReactionIcons[reaction], ...prevReactions];
        return Array.from(new Set(updatedReactions)).slice(0, 3);
      });
      setTotalReaction(totalReaction + 1);
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
