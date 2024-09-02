import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { fetchReaction } from "../../controllers/reactions";
import { ReactionButtonProps, ReactionIcons } from "../../interfaces/Reactions";
import ReactionIconButton from "./ReactionIconButton";

const CommentReactions: React.FC<ReactionButtonProps> = ({
  onReact,
  initialReaction = "REACT",
  comment,
  isReacted,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    ReactionIcons[initialReaction] ? initialReaction : "REACT",
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isReacted && comment) {
      dispatch(fetchReaction(comment));
    }
  }, [dispatch, comment, isReacted]);

  const handleReactionClick = (reaction: string) => {
    setSelectedReaction(reaction);
    onReact(reaction);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <ReactionIconButton
        reactionType={selectedReaction}
        isSelected={false}
        onClick={() => {}}
        icon={ReactionIcons[selectedReaction] || "REACT"}
      />
      {showReactions && (
        <div className="absolute left-0 flex gap-2 rounded-lg bg-white p-2 shadow-md">
          {Object.entries(ReactionIcons).map(([reaction, icon]) => (
            <ReactionIconButton
              key={reaction}
              reactionType={reaction}
              isSelected={selectedReaction === reaction}
              onClick={handleReactionClick}
              icon={icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentReactions;
