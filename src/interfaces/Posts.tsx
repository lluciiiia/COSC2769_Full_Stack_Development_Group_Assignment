import { Comment } from "./Comments";

export interface PostParams {
  _id?: string;
  creatorId: string;
  groupId?: string;
  content: string;
  imageURL?: string;
  createdAt?: Date;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  comments?: Comment[];
  reactions?: string[];
  isDetail?: boolean;
  profileSection?: ProfileSectionParams;
}

export interface ProfileSectionParams {
  post?: PostParams;
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
  creatorPost: PostParams[];
}

export interface PostFormProps {
  content: string;
  setContent: (content: string) => void;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  setVisibility: (visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP") => void;
  imageURL: string;
  setImageURL: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}
