import React, { useState } from "react";

interface ReactionButtonProps {
  onReact: (reaction: string) => void;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ onReact }) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <button className="p-2 text-gray-500 hover:text-gray-700">👍</button>
      {showReactions && (
        <div className="absolute left-0 flex gap-2 rounded-lg bg-white p-2 shadow-md">
          <button onClick={() => onReact("LIKE")} className="hover:bg-gray-200">
            👍
          </button> 
          <button onClick={() => onReact("LOVE")} className="hover:bg-gray-200">
            ❤️
          </button>
          <button onClick={() => onReact("HAHA")} className="hover:bg-gray-200">
            😊
          </button>
          <button
            onClick={() => onReact("ANGRY")}
            className="hover:bg-gray-200"
          >
            😡
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
