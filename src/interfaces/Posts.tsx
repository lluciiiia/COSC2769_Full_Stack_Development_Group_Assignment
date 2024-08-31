import { Comment } from "./Comments";

export interface PostHistory {
  content: string;
  imageURL?: string;
  updatedAt: Date;
}

export interface PostParams {
  _id?: string;
  creatorId: string;
  groupId?: string;
  content: string;
  imageURL?: string;
  images?: string[]; // Change from File[] to string[]
  createdAt?: Date;
  visibility: "PUBLIC" | "FRIEND_ONLY" | "GROUP";
  comments: Comment[];
  reactions?: string[];
  isDetail?: boolean;
  profileSection?: ProfileSectionParams;
  history: PostHistory[];
}

export interface ProfileSectionParams {
  post?: PostParams;
  profileImage?: string;
  profileName?: string;
}

export interface ReactionSectionProps {
  handleClick: () => void;
}
export interface AdminSectionProps {
  handleClick: () => void;
  post: {
    _id: string;
    creatorId: string;
    content: string;
    imageURL?: string;
    createdAt: string;
    visibility: string;
    profileSection?: {
      profileImage?: string;
      profileName?: string;
    };
    isDetail: boolean;
  };
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
  imageURL?: string;
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
