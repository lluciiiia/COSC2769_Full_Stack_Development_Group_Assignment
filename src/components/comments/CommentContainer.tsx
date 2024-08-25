import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Comment, CommentContainerProps } from "../../interfaces/Comments.tsx";
import CommentItem from "./CommentItem.tsx";
import CommentForm from "./CommentForm.tsx";

const CommentContainer: React.FC<CommentContainerProps> = ({
  initComments,
  postId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setComments(initComments);
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
      // const response = await fetch(`/api/comments`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ content: newComment }),
      // });
      // const result = await response.json();
      // setComments([...comments, result]);

      // Simulate adding a new comment
      const newCommentData = {
        id: "",
        userId: "currentUserId",
        profileSection: {
          profileImage: "https://example.com/profile3.jpg",
          profileName: "User Three",
        },
        postId: postId,
        createdAt: new Date(),
        content: newComment,
      };

      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="h-full w-full max-w-md">
      <div className="h-[550px] w-[760px] rounded-lg bg-gray-100 p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Comments</h2>
        <div className="flex h-[300px] flex-col gap-2 overflow-y-auto">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
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
