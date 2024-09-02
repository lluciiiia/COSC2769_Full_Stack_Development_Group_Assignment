interface Reaction {
  userId: string;
  reactionType: string;
  postId: string;
  createdAt: string;
}

export interface ReactProps {
  createComplete: boolean;
  reactions: Reaction[];
  isReacted: boolean;
  reactionType: string;
}

export interface ReactionButtonProps {
  onReact: (reaction: string) => void;
  initialReaction?: string;
  isReacted: boolean;
  comment?: string;
}

export const ReactionIcons = {
  LIKE: "👍",
  LOVE: "❤️",
  HAHA: "😊",
  ANGRY: "😡",
};
