import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { fetchReaction } from "../../controllers/reactions";

interface ReactionButtonProps {
  onReact: (reaction: string) => void;
  initialReaction?: string;
  isReacted: boolean;
  comment?: string;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ onReact, initialReaction, comment, isReacted }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(initialReaction);
  const reactionType = useSelector((state: AppState) => state.react.reactionType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReacted && comment) {
      dispatch(fetchReaction(comment)); // Fetch the reaction when the component mounts or comment ID changes
    }
  }, [dispatch, comment, isReacted]);

  const handleReactionClick = (reaction: string) => {
    setSelectedReaction(reaction);
    onReact(reaction);
  };

  const renderReactionIcon = () => {
    switch (selectedReaction) {
      case "LIKE":
        return "👍";
      case "LOVE":
        return "❤️";
      case "HAHA":
        return "😊";
      case "ANGRY":
        return "😡";
      default:
        return "REACT";
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <button className="p-2 text-gray-500 hover:text-gray-700">
        {renderReactionIcon()}
      </button>
      {showReactions && (
        <div className="absolute left-0 flex gap-2 rounded-lg bg-white p-2 shadow-md">
          <button
            onClick={() => handleReactionClick("LIKE")}
            className={`hover:bg-gray-200 ${selectedReaction === "LIKE" ? "bg-gray-300" : ""}`}
          >
            👍
          </button>
          <button
            onClick={() => handleReactionClick("LOVE")}
            className={`hover:bg-gray-200 ${selectedReaction === "LOVE" ? "bg-gray-300" : ""}`}
          >
            ❤️
          </button>
          <button
            onClick={() => handleReactionClick("HAHA")}
            className={`hover:bg-gray-200 ${selectedReaction === "HAHA" ? "bg-gray-300" : ""}`}
          >
            😊
          </button>
          <button
            onClick={() => handleReactionClick("ANGRY")}
            className={`hover:bg-gray-200 ${selectedReaction === "ANGRY" ? "bg-gray-300" : ""}`}
          >
            😡
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
