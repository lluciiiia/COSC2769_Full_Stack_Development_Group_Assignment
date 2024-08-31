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
      <button className="p-2 text-gray-500 hover:text-gray-700">React</button>
      {showReactions && (
        <div className="absolute left-0 flex gap-2 p-2 bg-white shadow-md rounded-lg">
          <button onClick={() => onReact("Like")} className="hover:bg-gray-200">
            👍
          </button>
          <button onClick={() => onReact("Love")} className="hover:bg-gray-200">
            ❤️
          </button>
          <button onClick={() => onReact("Happy")} className="hover:bg-gray-200">
            😊
          </button>
          <button onClick={() => onReact("Angry")} className="hover:bg-gray-200">
            😡
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
