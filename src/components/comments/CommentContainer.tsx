import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment, CommentContainerProps } from "../../interfaces/Comments";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { createComment } from "../../controllers/comments";
import CommentReactions from "../reactions/CommentReactions";
import { createReaction } from "../../controllers/reactions";
import { AppDispatch, AppState } from "../../app/store";
import { createCommentNotification } from "../../controllers/notifications";
import {
  loadReactionsFromLocal,
  saveReactionsToLocal,
} from "../../utils/localStorageUtils";
import { ReactionIcons } from "../../interfaces/Reactions";
import { deleteReaction } from "../../controllers/reactions";

const CommentContainer: React.FC<CommentContainerProps> = ({
  initComments,
  userId = "",
  postId,
  groupId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [comments, setComments] = useState<Comment[]>(initComments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [queuedReactions, setQueuedReactions] = useState<any[]>(
    loadReactionsFromLocal("queuedCommentReactions"),
  );
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const isReacted = useSelector((state: AppState) => state.react.isReacted);
  const [displayedReactions, setDisplayedReactions] = useState<string[]>([]);

  const handleRenderOutReactions = async (reactions: string[]) => {
    setDisplayedReactions(reactions);
  };

  const handleReaction = async (reactionType: string, commentId: string) => {
    const reaction = {
      postId: commentId,
      reactionType,
      sentFrom: "comment",
      userId,
    };

    if (reactionType === "UNDO_REACT") {
      await deleteReact(commentId, userId);
      console.log(`User removed reaction from comment ID: ${commentId}`);
    } else {
      if (navigator.onLine) {
        await sendReaction(reaction);
      } else {
        setIsOffline(true);
        queueReaction(reaction);
      }
    }
  };

  const deleteReact = async (postId: string, userId: string) => {
    try {
      await dispatch(deleteReaction({ postId, userId }) as any);
    } catch (error) {
      console.log(error);
    }
  };
  const sendReaction = async (reaction: any) => {
    try {
      if (navigator.onLine) {
        await dispatch(createReaction(reaction));
        console.log(
          `Reaction "${reaction.reactionType}" sent to server for comment ${reaction.postId}`,
        );
      }
    } catch (error) {
      console.error("Error reacting to comment:", error);
    }
  };

  const queueReaction = (reaction: any) => {
    setQueuedReactions((prev) => {
      const updatedQueue = [...prev, reaction];
      saveReactionsToLocal("queuedCommentReactions", updatedQueue);
      alert("Your reaction has been queued due to offline status.");
      console.log("Offline: Reaction queued for later syncing.");
      return updatedQueue;
    });
  };

  const syncReactions = async () => {
    if (queuedReactions.length === 0) return;

    setIsOffline(false);
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
    saveReactionsToLocal("queuedCommentReactions", []);
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

    if (newComment.trim() === "") {
      alert("Comment can't be empty");
      return;
    }

    try {
      dispatch(createCommentNotification(postId));
      const response = await createComment({
        userId,
        postId,
        content: newComment,
      });
      if (!response.ok) throw new Error("Failed to create comment");

      const result = await response.json();
      const updatedComments = [...comments, result.comment];
      setComments(updatedComments);
      handleRenderOutReactions(
        updatedComments.flatMap((comment) =>
          comment.reactions.map(
            (reaction) => ReactionIcons[reaction.reactionType],
          ),
        ),
      ); // Update displayed reactions
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Function to calculate reaction counts based on reaction types and filter by userId
  const getReactionCounts = (comment) => {
    const userReactions = comment.reactions.filter(
      (reaction) => reaction.userId === userId,
    );
    const reactionCounts = userReactions.reduce((acc, reaction) => {
      acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(reactionCounts)
      .slice(0, 3)
      .map(([reactionType, count]) => ({ type: reactionType, count }));
  };

  return (
    <div className="h-full w-full max-w-md">
      <div className="h-[600px] w-[700px] rounded-lg bg-gray-100 p-4 shadow-md">
        <h2 className="mb-4 mr-auto text-xl font-bold">Comments</h2>
        <div className="flex h-[300px] flex-col gap-2 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-gray-500">No Comments</p>
            </div>
          ) : (
            comments.map((comment) => {
              const reactionCounts = getReactionCounts(comment);

              return (
                <div key={comment._id} className="mb-4">
                  <CommentItem
                    groupId={String(groupId)}
                    comment={comment}
                    displayedReactions={displayedReactions} // Pass displayedReactions to CommentItem
                  />

                  <CommentReactions
                    reactionType={comment.reactions.filter(
                      (reaction) => reaction.userId === userId,
                    )}
                    comment={comment}
                    onReact={(reaction) =>
                      handleReaction(reaction, comment._id)
                    }
                    displayedReactions={displayedReactions}
                    isReacted={isReacted}
                    onDisplayedReactionsUpdate={handleRenderOutReactions} // Pass callback to CommentReactions
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-1 items-center justify-center">
          {isOffline ? (
            <span className="mt-2 text-center text-sm text-gray-500">
              You’re offline. Reactions will be synced as soon as you reconnect.
            </span>
          ) : isSyncing ? (
            <span className="mt-2 text-center text-sm text-gray-500">
              Syncing reactions...
            </span>
          ) : null}
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
