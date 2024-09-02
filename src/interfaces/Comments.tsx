import { ChangeEvent, FormEvent } from "react";
import { ProfileSectionParams } from "./Posts";
import { Reaction } from "./Reactions";
export interface CommentHistory {
  content: string;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  profileSection: ProfileSectionParams;
  reactions: Reaction[];
  createdAt: Date;
  history: CommentHistory[];
}

export interface CommentContainerProps {
  initComments: Comment[] | undefined;
  userId: string | undefined;
  postId: string | undefined;
}

export interface CommentProps {
  comment: Comment;
}

export interface CommentFormProps {
  newComment: string;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
