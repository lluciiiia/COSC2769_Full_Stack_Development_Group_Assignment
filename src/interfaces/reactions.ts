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
