import React from "react";
import { PostParams } from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { ReactionSection } from "./ReactionSection";
import { ProfileSection } from "./ProfileSection";
import { AdminSection } from "./AdminSection"; // Assuming you have an AdminSection component

const Post: React.FC<PostParams> = ({
  _id,
  creatorId,
  content,
  imageURL,
  createdAt,
  visibility,
  profileSection,
  isDetail,
}) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleClick = () => {
    navigate(`/posts/${userId}/${_id}`);
  };

  // Destructure with default values only if undefined
  const { profileImage = "default-image-url.jpg", profileName = "Undefined" } =
    profileSection || {}; // Fallback to an empty object if profileSection is undefined

  // Check if the current route is the admin page
  const isAdminPage = window.location.pathname.includes("/admin");

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-lg bg-white ${
        isDetail ? "" : "shadow-md"
      }`}
    >
      <ProfileSection
        profileImage={profileImage}
        profileName={profileName}
        post={{
          _id,
          creatorId,
          content,
          imageURL,
          createdAt,
          visibility,
          profileSection,
          isDetail,
        }} // Pass the entire PostParams object
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

      {/* Conditionally render AdminSection or ReactionSection */}
      {isAdminPage ? (
        <AdminSection handleClick={handleClick} post={{ _id, creatorId, content, imageURL, createdAt, visibility, profileSection, isDetail }} />
     
      ) : (
        <ReactionSection handleClick={handleClick} />
      )}
    </div>
  );
};

export default Post;
