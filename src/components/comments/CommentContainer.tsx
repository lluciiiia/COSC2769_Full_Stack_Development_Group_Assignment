import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment, CommentContainerProps } from "../../interfaces/Comments.tsx";
import CommentItem from "./CommentItem.tsx";
import CommentForm from "./CommentForm.tsx";
import { createComment } from "../../controllers/comments";
import ReactionButton from "../reactions/ReactionButton.js";
import { createReaction } from "../../controllers/reactions.js";
import { AppDispatch, AppState } from "../../app/store.js";

// Utility functions for local storage
const saveReactionsToLocal = (reactions: any[]) => {
  localStorage.setItem("queuedCommentReactions", JSON.stringify(reactions));
};

const loadReactionsFromLocal = (): any[] => {
  const data = localStorage.getItem("queuedCommentReactions");
  return data ? JSON.parse(data) : [];
};

const CommentContainer: React.FC<CommentContainerProps> = ({
  initComments,
  userId,
  postId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [comments, setComments] = useState<Comment[]>(initComments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [queuedReactions, setQueuedReactions] = useState<any[]>(
    loadReactionsFromLocal(),
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const isReacted = useSelector((state: AppState) => state.react.isReacted);

  const handleReaction = async (reactionType: string, commentId: string) => {
    console.log(
      `User reacted with: ${reactionType} on comment ID: ${commentId}`,
    );
    const reaction = { postId: commentId, reactionType, sentFrom: "comment" };

    if (navigator.onLine) {
      await sendReaction(reaction);
    } else {
      queueReaction(reaction);
    }
  };

  const sendReaction = async (reaction: any) => {
    try {
      await dispatch(createReaction(reaction));
      console.log(
        `Reaction "${reaction.reactionType}" sent to server for comment ${reaction.postId}`,
      );
    } catch (error) {
      console.error("Error reacting to comment:", error);
    }
  };

  const queueReaction = (reaction: any) => {
    setQueuedReactions((prev) => {
      const updatedQueue = [...prev, reaction];
      saveReactionsToLocal(updatedQueue);
      alert("Your reaction has been queued due to offline status.");
      console.log("Offline: Reaction queued for later syncing.");
      return updatedQueue;
    });
  };

  const syncReactions = async () => {
    if (queuedReactions.length === 0) return;

    setIsSyncing(true);
    try {
      for (const reaction of queuedReactions) {
        await sendReaction(reaction);
      }
      clearQueuedReactions();
      alert("All queued reactions have been successfully synced.");
    } catch (error) {
      console.error("Error syncing reactions:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const clearQueuedReactions = () => {
    setQueuedReactions([]);
    saveReactionsToLocal([]);
  };

  useEffect(() => {
    window.addEventListener("online", syncReactions);
    return () => {
      window.removeEventListener("online", syncReactions);
    };
  }, [queuedReactions]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createComment({
        userId,
        postId,
        content: newComment,
      });
      if (!response.ok) throw new Error("Failed to create comment");

      const result = await response.json();
      setComments((prev) => [...prev, result.comment]);
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
              <div key={comment._id}>
                <CommentItem comment={comment} />
                <ReactionButton
                  comment={comment._id}
                  onReact={(reaction) => handleReaction(reaction, comment._id)}
                  isReacted={isReacted}
                />
              </div>
            ))
          )}
        </div>
        <CommentForm
          newComment={newComment}
          onCommentChange={handleCommentChange}
          onSubmit={handleSubmit}
        />
        {isSyncing && (
          <div className="mt-2 text-center text-sm text-gray-500">
            Syncing reactions...
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
