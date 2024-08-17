export interface Comment {
  id: string;
  userId: string;
  profileImage: string;
  profileName: string;
  profileLink: string;
  postId: string;
  createdAt: Date;
  content: string;
}

export interface CommentContainerProps {
  postId: string;
}
