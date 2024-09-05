export interface Reaction{
  userId: string,
  reactionType: string,
  postId: string,
  createdAt: string,
  onModel: string
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
  reactionType?: string,
  comment?: string;
}

export interface PostReactionsProps {
  handleClick: () => void;
  onReact: (reaction: string) => void;
  initialReaction?: string;
  isReacted: boolean;
  reactions: Reaction[];
  commentCount?: number;
}

export const ReactionIcons = {
  LIKE: "👍",
  LOVE: "❤️",
  HAHA: "😊",
  ANGRY: "😡",
};

export const ReactionIconsWithText = {
  LIKE: "👍 LIKE",
  LOVE: "❤️ LOVE",
  HAHA: "😊 HAHA",
  ANGRY: "😡 ANGRY",
};
