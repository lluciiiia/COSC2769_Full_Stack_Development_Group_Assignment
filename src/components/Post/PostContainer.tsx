import React from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactionSection } from "./ReactionSection";
import { AdminSection } from "./AdminSection";
import { ProfileSection } from "./ProfileSection";
import CommentItem from "../comments/CommentItem";

const PostContainer: React.FC<PostParams> = ({
  _id,
  creatorId,
  content,
  imageURL,
  createdAt,
  visibility,
  profileSection,
  isDetail,
  history,
  comments,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/posts/${_id}`);
  };

  const isAdminPage = location.pathname === "/admin";

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
          content,
          imageURL,
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
        <p className="mb-2 ml-5 text-left text-lg font-semibold">{content}</p>
        {imageURL && (
          <img
            src={imageURL}
            alt="Post Content"
            className={`h-[300px] ${isDetail ? "w-[500px]" : "w-full rounded-lg"}`}
          />
        )}
      </div>

      {isAdminPage ? (
        <AdminSection
          handleClick={handleClick}
          post={{
            _id,
            creatorId,
            content,
            imageURL,
            createdAt,
            visibility,
            profileSection,
            isDetail,
            history,
            comments,
          }}
        />
      ) : (
        <ReactionSection handleClick={handleClick} />
      )}

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
