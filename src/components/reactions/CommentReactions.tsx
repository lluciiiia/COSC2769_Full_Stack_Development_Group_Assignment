import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReaction } from "../../controllers/reactions";
import { ReactionForCommentProps, ReactionIcons, ReactionIconsWithText } from "../../interfaces/Reactions";
import ReactionIconButton from "./ReactionIconButton";
import { selectAuthState } from "../../features/authSlice";
import { AppDispatch } from "../../app/store";
const CommentReactions: React.FC<ReactionForCommentProps> = ({
  initialReaction = "REACT",
  reactionType,
  comment,
  onReact,
}) => {
  const { id } = useSelector(selectAuthState);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(initialReaction);
  const [displayedReactions, setDisplayedReactions] = useState<string[]>([]);
  const [isReacted, setIsReacted] = useState(false);
  const [totalReaction, setTotalReaction] = useState(comment ? comment.reactions.length : 0);
  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
    if (comment) {
      // Update displayed reactions and total reaction count
      const uniqueReactions = Array.from(
        new Set(comment.reactions.map((reaction) => ReactionIcons[reaction.reactionType]))
      ).slice(0, 3) as string[];
      setDisplayedReactions(uniqueReactions);
      setTotalReaction(comment.reactions.length);

      // Check if the user has already reacted
      const userReaction = comment.reactions.find(
        (reaction) => reaction.userId && reaction.userId.toString() === id
      );

      if (userReaction) {
        setSelectedReaction(userReaction.reactionType);
        setIsReacted(true);
      } else {
        setSelectedReaction("REACT");
        setIsReacted(false);
      }
    }
  }, [comment, id]);

  useEffect(() => {
    if (isReacted && comment) {
      dispatch(fetchReaction(comment.postId));
    }
  }, [dispatch, comment, isReacted]);

  const handleReactionClick = (reaction: string) => {
    if (isReacted && selectedReaction === reaction) {
      // Undo the reaction
      setIsReacted(false);
      setSelectedReaction("REACT");
      onReact("UNDO_REACT");

      // Remove the reaction from displayed reactions
      setDisplayedReactions((prevReactions) =>
        prevReactions.filter((r) => r !== ReactionIcons[reaction])
      );
      setTotalReaction(totalReaction - 1);
    } else if (isReacted && selectedReaction !== reaction) {
      // Update the reaction
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
      // Add new reaction
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

  return (
    <div className="relative z-10">
      <div
        className="relative max-w-[100px] flex flex-col"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <ReactionIconButton
          reactionType={selectedReaction}
          isSelected={isReacted}
          onClick={() => setShowReactions(!showReactions)}
          icon={ReactionIconsWithText[selectedReaction] || "REACT"}
        />
        {showReactions && (
          <div className="absolute left-0 flex gap-2 rounded-lg bg-white p-2 shadow-md">
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
      <div className="ml-auto mt-8 pr-8 text-sm text-gray-600">
        {totalReaction} {totalReaction === 1 ? "reaction" : "reactions"}
      </div>
    </div>
  );
};

export default CommentReactions;
