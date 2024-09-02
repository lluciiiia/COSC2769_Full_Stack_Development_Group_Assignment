import React from "react";

interface ReactionIconButtonProps {
  reactionType: string;
  isSelected: boolean;
  onClick: (reaction: string) => void;
  icon: React.ReactNode;
}

const ReactionIconButton: React.FC<ReactionIconButtonProps> = ({
  reactionType,
  isSelected,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={() => onClick(reactionType)}
      className={`flex items-center space-x-2 rounded px-3 py-1 ${
        isSelected ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
    >
      {icon}
    </button>
  );
};

export default ReactionIconButton;
