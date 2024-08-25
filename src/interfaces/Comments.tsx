import { ChangeEvent, FormEvent } from "react";
import { ProfileSectionParams } from "./Posts";

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  profileSection: ProfileSectionParams;
  createdAt: Date;
}

export interface CommentContainerProps {
  initComments: Comment[];
  userId: string | undefined;
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
