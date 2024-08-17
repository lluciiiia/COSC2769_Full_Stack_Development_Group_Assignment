export interface Comment {
  userId: string;
  postId: string;
  createdAt: Date;
  content: string;
}

export interface CommentContainerProps {
  postId: string;
}
