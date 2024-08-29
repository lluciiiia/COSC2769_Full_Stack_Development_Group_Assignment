import React from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { ReactionSection } from "./ReactionSection";
import { ProfileSection } from "./ProfileSection";

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
}) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleClick = () => {
    navigate(`/posts/${userId}/${_id}`);
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

      <ReactionSection handleClick={handleClick} />
    </div>
  );
};

export default PostContainer;
