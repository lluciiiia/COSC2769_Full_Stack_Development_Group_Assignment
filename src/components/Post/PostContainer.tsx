import React, { useState, useEffect } from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate, useLocation } from "react-router-dom";
import { PostReactions } from "../reactions/PostReactions";
import { AdminSection } from "./AdminSection";
import { ProfileSection } from "./ProfileSection";
import { AppDispatch, AppState } from "../../app/store";
import { createReaction, fetchReaction } from "../../controllers/reactions";
import CommentItem from "../comments/CommentItem";
import { useDispatch, useSelector } from "react-redux";

// Utility functions for local storage
const saveReactionsToLocal = (reactions: any[]) => {
  localStorage.setItem("queuedPostReactions", JSON.stringify(reactions));
};

const loadReactionsFromLocal = (): any[] => {
  const data = localStorage.getItem("queuedPostReactions");
  return data ? JSON.parse(data) : [];
};

const PostContainer: React.FC<PostParams> = ({
  _id,
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
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showFullContent, setShowFullContent] = useState(false);
  const [initialReaction, setInitialReaction] = useState<string | undefined>(
    undefined,
  );
  const [queuedReactions, setQueuedReactions] = useState<any[]>(
    loadReactionsFromLocal(),
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const isReacted = useSelector((state: AppState) => state.react.isReacted);
  const reactions = useSelector((state: AppState) => state.react.reactions);

  // Convert _id to a string
  const postId = _id!.toString();

  useEffect(() => {
    const fetchUserReaction = async () => {
      try {
        const reaction = await dispatch(fetchReaction(postId));
        if (reaction.payload) {
          setInitialReaction(reaction.payload.reactionType);
        }
      } catch (error) {
        console.error("Error fetching user reaction:", error);
      }
    };

    fetchUserReaction();
  }, [dispatch, postId]);

  const handleClick = () => {
    navigate(`/posts/${postId}`);
  };

  const handleReaction = async (reaction: string) => {
    console.log(`User reacted with: ${reaction} on post ID: ${postId}`);
    const reactionPayload = {
      postId: postId,
      reactionType: reaction,
      sentFrom: "post",
    };

    if (navigator.onLine) {
      await sendReaction(reactionPayload);
    } else {
      queueReaction(reactionPayload);
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

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-lg bg-white ${
        isDetail ? "" : "shadow-md"
      }`}
    >
      <ProfileSection
        profileImage={profileSection?.profileImage}
        profileName={profileSection?.profileName}
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
            className="flex space-x-4 overflow-x-auto"
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
          commentCount={comments?.length || 0} // Pass the number of comments
        />
      )}

      {!isDetail && (
        <div className="mt-4">
          {comments
            ?.slice(0, 2)
            .map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
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

      {isSyncing && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Syncing reactions...
        </div>
      )}
    </div>
  );
};

export default PostContainer;
