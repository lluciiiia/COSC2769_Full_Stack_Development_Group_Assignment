export interface PostParams {
  id: string;
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
  isliked: boolean; // check if user liked this post
  likes: number;
}

