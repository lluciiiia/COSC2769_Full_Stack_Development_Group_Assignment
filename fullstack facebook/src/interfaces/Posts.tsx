export interface PostParams {
  id: string;
  profileImage: string;
  profileName: string;
  postContent: string;
  postImage: string;
  profileLink: string;
}

export interface ProfileSectionParams {
  profileImage: string;
  profileName: string;
  profileLink: string;
}

export interface ReactionSectionProps {
  handleClick: () => void;
}
