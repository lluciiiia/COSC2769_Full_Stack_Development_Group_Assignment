import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Comment, CommentContainerProps } from "../../interfaces/Comments.tsx";
import CommentItem from "./CommentItem.tsx";
import CommentForm from "./CommentForm.tsx";
import { createComment } from "../../controllers/comments.tsx";

const CommentContainer: React.FC<CommentContainerProps> = ({
  initComments,
  userId,
  postId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setComments(initComments ? initComments : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createComment({
        userId: userId,
        postId: postId,
        content: newComment,
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const result = await response.json();

      setComments([...comments, result.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="h-full w-full max-w-md">
      <div className="h-[550px] w-[700px] rounded-lg bg-gray-100 p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Comments</h2>
        <div className="flex h-[300px] flex-col gap-2 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-gray-500">No Comments</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          )}
        </div>
        <CommentForm
          newComment={newComment}
          onCommentChange={handleCommentChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CommentContainer;
