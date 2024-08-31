import { UserType } from "./Users";
export interface Reaction{
    userId: UserType,
    reactionType: string,
    createdAt: string
}

export interface ReactProps{
    createComplete: boolean;
    reactions: Reaction[];
}