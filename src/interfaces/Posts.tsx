import { Comment } from "./Comments";
import { Reaction } from "./Reactions";
export interface PostHistory {
  content: string;
  images?: string[];
  updatedAt: Date;
}

export interface RevertPostParams {
  _id: string;
  content: string;
  images?: string[];
}

export interface PostContainerProps extends PostParams {
  onReact: (reaction: string) => Promise<void>;
  isDiscussionTab?: boolean;
}
export interface PostParams {
  _id: string;
  creatorId: string;
  groupId?: string;
  content: string;
  images?: string[];
  createdAt: Date;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  comments: Comment[];
  reactions?: Reaction[];
  isDetail?: boolean;
  profileSection?: ProfileSectionParams;
  history: PostHistory[];
}

export interface ProfileSectionParams {
  post?: PostParams;
  profileImage?: string;
  profileName?: string;
  isDiscussionTab?: boolean;
}

export interface AdminSectionProps {
  handleClick: () => void;
  post?: PostParams;
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
  groupPost: GroupPostParams[];
}

export interface GroupPostParams {
  _id?: string;
  creatorId: {
    _id: string;
    name: string;
    profilePictureURL?: string;
  };
  groupId?: string;
  content: string;
  images?: string[];
  createdAt: Date;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  comments: Comment[];
  reactions?: string[];
  isDetail?: boolean;
  profileSection?: ProfileSectionParams;
  history: PostHistory[];
}

export interface PostFormProps {
  content: string;
  setContent: (content: string) => void;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  images: string[];
  setImages: (images: string[]) => void;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
  isEdit: boolean;
}
