import React, { useState } from "react";
import { ProfileSectionParams } from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostById } from "../../controllers/posts";
import MenuDropDown from "../MenuDropDown";
import PostModal from "../post/PostModal";
import DefaultProfile from "../../assets/icons/DefaultProfile.tsx";
import PostHistoryModal from "./PostHistoryModal.tsx";
import { formatRelativeTime } from "../../utils/formatRelativeTime.ts";
import ErrorPage from "../../pages/ErrorPage.tsx";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../features/authSlice.ts";

export const ProfileSection: React.FC<ProfileSectionParams> = ({
  post,
  profileImage,
  profileName,
}) => {
  if (!post) return <ErrorPage />;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useSelector(selectAuthState);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsDropdownOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    setIsDropdownOpen(false);
    try {
      const response = await deletePostById(post._id);
      if (!response) {
        alert("Failed to delete the post. Please try again.");
      } else {
        navigate(`/home`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while trying to delete the post.");
    }
  };

  const handleViewHistory = () => {
    setIsHistoryModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Determine safe profile image and name
  const safeProfileImage =
    typeof profileImage === "string" && profileImage.length > 0
      ? profileImage
      : null;
  const safeProfileName = profileName || "Undefined";

  return (
    <div className="relative flex items-start p-6">
      <div className="mr-4 flex-shrink-0">
        {safeProfileImage ? (
          <img
            src={safeProfileImage}
            alt="Profile"
            className="h-[50px] w-[50px] rounded-full"
          />
        ) : (
          <div className="h-[50px] w-[50px]">
            <DefaultProfile />
          </div>
        )}
      </div>
      <div>
        <div className="mr-12 font-bold">{safeProfileName}</div>
      </div>
      <div className="relative ml-auto flex items-center justify-center gap-1">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            {formatRelativeTime(post.createdAt)}
          </p>
          {post.history?.length > 0 ? (
            <p className="text-right text-xs text-gray-500">(Edited)</p>
          ) : null}
        </div>
        <img
          src="/src/assets/svgs/ThreeDots.svg"
          alt="Three dots"
          onClick={toggleDropdown}
          className="cursor-pointer"
        />
        {isDropdownOpen && (
          <MenuDropDown
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewHistory={handleViewHistory}
            creatorId={post.creatorId}
          />
        )}
      </div>
      <PostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userId={id}
        post={post}
        groupId={isEditModalOpen ? post.groupId : null}
      />

      {/* Modal for viewing edit history */}
      {isHistoryModalOpen && (
        <PostHistoryModal
          history={post.history}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}
    </div>
  );
};
