import React, { useState, useEffect } from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate } from "react-router-dom";
import { ReactionSection } from "./ReactionSection";
import { ProfileSection } from "./ProfileSection";
import { AppDispatch, AppState } from "../../app/store";
import { createReaction, fetchReaction } from "../../controllers/reactions";
import CommentItem from "../comments/CommentItem";
import { useDispatch, useSelector } from "react-redux";

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
  const [showFullContent, setShowFullContent] = useState(false);
  const [initialReaction, setInitialReaction] = useState<string | undefined>(undefined);

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
    try {
      await dispatch(
        createReaction({ postId: postId, reactionType: reaction, sentFrom: 'post' })
      );
      console.log(
        `Reaction "${reaction}" sent to server for post ${postId}`,
      );
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

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
          _id: postId, // Pass the string version of _id
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
                className="h-[300px] w-[300px] flex-shrink-0 rounded-lg" // Fixed height and width
              />
            ))}
          </div>
        )}
      </div>

      <ReactionSection 
        reactions={reactions} 
        isReacted={isReacted} 
        handleClick={handleClick} 
        onReact={handleReaction} 
        initialReaction={initialReaction}
        commentCount={comments?.length || 0} // Pass the number of comments
      />

      {!isDetail && (
        <div className="mt-4">

          {comments?.slice(0, 2).map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
          {comments?.length > 2 && (
            <h3
              className="mb-2 ml-5 cursor-pointer text-left text-sm font-semibold"
              onClick={handleClick}
            >
              View more comments ({comments.length - 2}) {/* Display the number of additional comments */}
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
