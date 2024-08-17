import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Comment, CommentContainerProps } from "../interfaces/Comments.tsx";
import { formatRelativeTime } from "../utils/formatRelativeTime.ts";

const CommentContainer: React.FC<CommentContainerProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // TODO: Replace with an actual API call
        // const response = await fetch(`/api/comments?postId=${postId}`);
        // const data: Comment[] = await response.json();
        const response = await fetch("/sample-comments.json");
        const data: Comment[] = await response.json();
        setComments(data);
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
        profileImage: "https://example.com/profile3.jpg",
        profileName: "User Three",
        profileLink: "https://example.com/user3",
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
          {comments.map((comment, index) => (
            <div key={comment.id} className="rounded-md bg-white p-2 shadow-sm">
              <div className="flex">
                <div className="mr-2 flex-shrink-0">
                  <img
                    src={comment.profileImage}
                    alt="Profile"
                    className="h-[30px] w-[30px] rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="mr-2 font-bold">{comment.profileName}</div>
                    <a
                      href={comment.profileLink}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      @{comment.profileName}
                    </a>
                  </div>
                </div>
                <p className="ml-auto text-sm text-gray-500">
                  {formatRelativeTime(comment.createdAt)}
                </p>
              </div>

              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center"
        >
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="w-full rounded-md border border-gray-300 p-2"
            rows={4}
          />
          <button
            type="submit"
            className="mt-2 rounded-md bg-[#FFC123] px-4 py-2 text-white"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentContainer;
