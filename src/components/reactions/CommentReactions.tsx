import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReaction } from "../../controllers/reactions";
import { ReactionButtonProps, ReactionIcons } from "../../interfaces/Reactions";
import ReactionIconButton from "./ReactionIconButton";

const CommentReactions: React.FC<ReactionButtonProps> = ({
  onReact,
  initialReaction = "REACT",
  comment,
  isReacted,
  isOffline,
  isSyncing,
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
    <>
      {isOffline ? (
        <span className="mt-2 text-center text-sm text-gray-500">
          You’re offline. Reactions will be synced as soon as you reconnect.
        </span>
      ) : isSyncing ? (
        <span className="mt-2 text-center text-sm text-gray-500">
          Syncing reactions...
        </span>
      ) : (
        <div
          className="relative z-10"
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
      )}
    </>
  );
};

export default CommentReactions;
