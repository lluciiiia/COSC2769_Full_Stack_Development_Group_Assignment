import { ChangeEvent, FormEvent } from "react";

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

export interface CommentProps {
  comment: Comment;
}

export interface CommentFormProps {
  newComment: string;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
