import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { fetchReaction } from "../../controllers/reactions";
import { ReactionButtonProps, ReactionIcons } from "../../interfaces/Reactions";

const ReactionButton: React.FC<ReactionButtonProps> = ({
  onReact,
  initialReaction = "REACT",
  comment,
  isReacted,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    ReactionIcons[initialReaction] ? initialReaction : "REACT",
  );
  const reactionType = useSelector(
    (state: AppState) => state.react.reactionType,
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
      <button className="p-2 text-gray-500 hover:text-gray-700">
        {ReactionIcons[selectedReaction] || "REACT"}
      </button>
      {showReactions && (
        <div className="absolute left-0 flex gap-2 rounded-lg bg-white p-2 shadow-md">
          {Object.entries(ReactionIcons).map(([reaction, icon]) => (
            <button
              key={reaction}
              onClick={() => handleReactionClick(reaction)}
              className={`hover:bg-gray-200 ${selectedReaction === reaction ? "bg-gray-300" : ""}`}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
