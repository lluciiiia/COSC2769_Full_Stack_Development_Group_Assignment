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
  groupId?: string;
}

export interface CommentProps {
  displayedReactions?: string[];
  comment: Comment;
  groupId?: string;
}

export interface CommentFormProps {
  newComment: string;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
