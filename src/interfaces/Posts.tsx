import { Comment } from "./Comments";

export interface PostParams {
  _id: string;
  creatorId: string;
  groupId?: string;
  content: string;
  imageURL?: string;
  dateCreated: Date;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  comments: Comment;
  reactions: string[];
  isDetail?: boolean;
  profileSection: ProfileSectionParams;
}

export interface ProfileSectionParams {
  profileImage?: string;
  profileName?: string;
}

export interface ReactionSectionProps {
  handleClick: () => void;
}

export interface PostProps {
  id: string;
  profileImage: string;
  profileName: string;
  postContent: string;
  postImage: string;
  profileLink: string;
  isDetail: boolean;
  likes: number;
}

export interface PostState {
  posts: PostParams[];
}
