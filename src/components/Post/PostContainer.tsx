import React, { useState } from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate } from "react-router-dom";
import { ReactionSection } from "./ReactionSection";
import { ProfileSection } from "./ProfileSection";
import CommentItem from "../comments/CommentItem";

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
  const navigate = useNavigate();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleClick = () => {
    navigate(`/posts/${_id}`);
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

      <ReactionSection handleClick={handleClick} />

      {/* Display comments if not in detail view and there are comments */}
      {!isDetail && comments?.length > 0 && (
        <div className="mt-4">
          <h3
            className="mb-2 ml-5 cursor-pointer text-left text-sm font-semibold"
            onClick={handleClick}
          >
            View more comments ..
          </h3>
          {comments.slice(0, 2).map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
