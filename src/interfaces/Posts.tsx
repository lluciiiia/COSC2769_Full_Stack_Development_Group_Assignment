export interface PostParams {
  id: string;
userId: string;
  profileImage: string;
  profileName: string;
  postContent: string;
  postImage: string;
  profileLink: string;
  isDetail: boolean;
}

export interface ProfileSectionParams {
  profileImage: string;
  profileName: string;
  profileLink: string;
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
