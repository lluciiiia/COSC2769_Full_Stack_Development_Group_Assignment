import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment, CommentContainerProps } from "../../interfaces/Comments.tsx";
import CommentItem from "./CommentItem.tsx";
import CommentForm from "./CommentForm.tsx";
import { createComment } from "../../controllers/comments";
import ReactionButton from "../reactions/ReactionButton.js";
import { createReaction } from "../../controllers/reactions.js";
import { AppDispatch, AppState } from "../../app/store.js";

// Utility functions for local storage or IndexedDB (simplified example)
const saveReactionsToLocal = (reactions: any[]) => {
  localStorage.setItem("queuedReactions", JSON.stringify(reactions));
};

const loadReactionsFromLocal = (): any[] => {
  const data = localStorage.getItem("queuedReactions");
  return data ? JSON.parse(data) : [];
};

const CommentContainer: React.FC<CommentContainerProps> = ({
  initComments,
  userId,
  postId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [comments, setComments] = useState<Comment[]>([]);
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

    const reaction = {
      postId: commentId,
      reactionType: reactionType,
      sentFrom: "comment",
    };

    try {
      if (navigator.onLine) {
        // If online, send the reaction directly to the server
        await dispatch(createReaction(reaction));
        console.log(
          `Reaction "${reactionType}" sent to server for comment ${commentId}`,
        );
      } else {
        // If offline, queue the reaction and save it to local storage
        setQueuedReactions((prev) => {
          const updatedQueue = [...prev, reaction];
          saveReactionsToLocal(updatedQueue);
          alert("Your reaction has been queued due to offline status."); // Alert only when queuing
          return updatedQueue;
        });
        console.log("Offline: Reaction queued for later syncing.");
      }
    } catch (error) {
      console.error("Error reacting to comment:", error);
    }
  };

  // Sync queued reactions when coming back online
  const syncReactions = async () => {
    if (queuedReactions.length === 0) return;

    setIsSyncing(true);
    try {
      for (const reaction of queuedReactions) {
        await dispatch(createReaction(reaction));
        console.log(
          `Synced reaction: ${reaction.reactionType} for post ${reaction.postId}`,
        );
      }

      // Clear queue after syncing
      setQueuedReactions([]);
      saveReactionsToLocal([]);
      alert("All queued reactions have been successfully synced."); // Alert when synced
    } catch (error) {
      console.error("Error syncing reactions:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Sync reactions when the app comes back online
    window.addEventListener("online", syncReactions);

    return () => {
      window.removeEventListener("online", syncReactions);
    };
  }, [queuedReactions]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setComments(initComments ? initComments : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [dispatch, initComments]);

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
              <div key={comment._id}>
                <CommentItem comment={comment} />
                <div className="">
                  <ReactionButton
                    comment={comment._id}
                    onReact={(reaction) =>
                      handleReaction(reaction, comment._id)
                    }
                    isReacted={isReacted}
                  />
                </div>
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
