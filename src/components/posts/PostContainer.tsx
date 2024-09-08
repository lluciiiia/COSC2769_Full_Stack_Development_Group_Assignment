import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PostReactions } from "../reactions/PostReactions";
import { AdminSection } from "./AdminSection";
import { ProfileSection } from "./ProfileSection";
import { AppDispatch, AppState } from "../../app/store";
import { createReaction } from "../../controllers/reactions";
import CommentItem from "../comments/CommentItem";
import { selectAuthState } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  saveReactionsToLocal,
  loadReactionsFromLocal,
} from "../../utils/localStorageUtils";
import { deleteReaction } from "../../controllers/reactions";
import { PostContainerProps } from "../../interfaces/Posts";

const PostContainer: React.FC<PostContainerProps> = ({
  _id,
  creatorId,
  groupId,
  content,
  images,
  onReact,
  createdAt,
  visibility,
  reactions,
  profileSection,
  isDetail,
  history,
  comments,
  isDiscussionTab,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showFullContent, setShowFullContent] = useState(false);
  const [queuedReactions, setQueuedReactions] = useState<any[]>(
    loadReactionsFromLocal("queuedPostReactions"),
  );
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const { id: userId } = useSelector(selectAuthState);
  const isReacted = useSelector((state: AppState) => state.react.isReacted);

  // Convert _id to a string
  const postId = _id!.toString();

  // Filter the reactions array to find the initial reaction by the current user
  const userReaction = reactions?.find(
    (reaction) => reaction?.userId?.toString() === userId?.toString(),
  );

  const [initialReaction, setInitialReaction] = useState<string>(
    userReaction ? userReaction.reactionType : "REACT",
  );

  const handleClick = () => {
    navigate(`/posts/${postId}`);
  };

  const handleReaction = async (reaction: string) => {
    if (reaction === "UNDO_REACT") {
      await deleteReact(postId, userId);
      console.log(`User deleted with: ${reaction} on post ID: ${postId}`);
    } else {
      console.log(`User reacted with: ${reaction} on post ID: ${postId}`);
      const reactionPayload = {
        postId: postId,
        reactionType: reaction,
        sentFrom: "post",
      };

      if (navigator.onLine) {
        await sendReaction(reactionPayload);
      } else {
        setIsOffline(true);
        queueReaction(reactionPayload);
      }
    }
  };

  const sendReaction = async (reaction: any) => {
    try {
      await dispatch(createReaction(reaction));
      console.log(
        `Reaction "${reaction.reactionType}" sent to server for post ${postId}`,
      );
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  const deleteReact = async (postId: string, userId: string) => {
    try {
      await dispatch(deleteReaction({ postId, userId }) as any);
    } catch (error) {
      console.log(error);
    }
  };

  const queueReaction = (reaction: any) => {
    setQueuedReactions((prev) => {
      const updatedQueue = [...prev, reaction];
      saveReactionsToLocal("queuedPostReactions", updatedQueue);
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
    saveReactionsToLocal("queuedPostReactions", []);
  };

  useEffect(() => {
    window.addEventListener("online", syncReactions);
    return () => {
      window.removeEventListener("online", syncReactions);
    };
  }, [queuedReactions]);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const isAdminPage = location.pathname === "/admin";

  // Define the maximum length for the excerpt
  const maxLength = 100;

  // Check if the content is too long
  const isContentLong = content.length > maxLength;
  const displayedContent =
    isContentLong && !showFullContent
      ? `${content.slice(0, maxLength)}...`
      : content;

  const handleCommentReaction = async (commentId: string, reaction: string) => {
    const reactionPayload = {
      commentId: commentId,
      reactionType: reaction,
      sentFrom: "comment",
    };

    if (navigator.onLine) {
      await sendReaction(reactionPayload);
    } else {
      setIsOffline(true);
      queueReaction(reactionPayload);
    }
  };

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-lg bg-white ${
        isDetail ? "" : "shadow-md"
      }`}
    >
      <ProfileSection
        profileImage={profileSection?.profileImage}
        profileName={profileSection?.profileName}
        isDiscussionTab={isDiscussionTab}
        post={{
          _id: postId,
          creatorId,
          groupId,
          content,
          images,
          createdAt,
          visibility,
          profileSection,
          isDetail,
          history,
          comments,
        }}
      />

      {/* Post Content */}
      <div className="text-center">
        <p className="mb-2 ml-5 text-left text-lg font-semibold">
          {displayedContent}
          {isContentLong && !showFullContent && (
            <span
              onClick={handleToggleContent}
              className="ml-1 cursor-pointer text-[#FFC123]"
            >
              Read more
            </span>
          )}
          {showFullContent && isContentLong && (
            <span
              onClick={handleToggleContent}
              className="ml-1 cursor-pointer text-[#FFC123]"
            >
              Show less
            </span>
          )}
        </p>
        {images && images.length > 0 && (
          <div
            className={`flex space-x-4 overflow-x-auto ${
              images.length === 1 ? "justify-center" : "px-4"
            }`}
            style={{ scrollbarWidth: "thin" }} // For Firefox
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="h-[300px] w-[300px] flex-shrink-0 rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      {isAdminPage ? (
        <AdminSection
          handleClick={handleClick}
          post={{
            _id,
            creatorId,
            content,
            images,
            createdAt,
            visibility,
            profileSection,
            isDetail,
            history,
            comments,
          }}
        />
      ) : (
        <PostReactions
          handleClick={handleClick}
          onReact={handleReaction}
          initialReaction={initialReaction}
          isReacted={isReacted}
          reactions={reactions}
          commentCount={comments?.length || 0}
        />
      )}

      {/* Ensure Comments Section Exists */}
      {!isDetail && (
        <div className="mt-4">
          {comments?.length === 0 ? (
            <p className="mb-4 ml-5 text-center text-sm text-gray-500">
              Write the first comment!
            </p>
          ) : (
            comments
              ?.slice(0, 2)
              .map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  onReact={(reaction) =>
                    handleCommentReaction(comment._id, reaction)
                  }
                  groupId={String(groupId)}
                />
              ))
          )}
          {comments?.length > 2 && (
            <h3
              className="mb-2 ml-5 cursor-pointer text-left text-sm font-semibold"
              onClick={handleClick}
            >
              View more comments ({comments.length - 2})
            </h3>
          )}
        </div>
      )}
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
  );
};

export default PostContainer;
