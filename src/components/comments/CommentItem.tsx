import React, { useState } from "react";
import MenuDropDown from "../MenuDropDown";
import { CommentProps } from "../../interfaces/Comments";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { deleteCommentById } from "../../controllers/comments";
import CommentHistoryModal from "./CommentHistoryModal";
import DefaultProfile from "../../assets/icons/DefaultProfile";
import CommentEditor from "./CommentEditor";
import { selectAuthState } from "../../features/authSlice";
import { useSelector } from "react-redux";

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { id } = useSelector(selectAuthState);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    setIsDropdownOpen(false);
    try {
      const response = await deleteCommentById(comment._id);
      if (!response) {
        alert("Failed to delete the comment. Please try again.");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred while trying to delete the comment.");
    }
  };

  const handleViewHistory = () => {
    setIsHistoryModalOpen(true);
    setIsDropdownOpen(false);
  };

  const safeProfileImage =
    typeof comment.profileSection?.profileImage === "string" &&
    comment.profileSection.profileImage.length > 0
      ? comment.profileSection.profileImage
      : null;

  return (
    <div className="w-[650px] rounded-md bg-white p-2 shadow-sm">
      <div className="flex">
        <div className="mr-2 flex-shrink-0">
          {safeProfileImage ? (
            <img
              src={comment.profileSection.profileImage}
              alt="Profile"
              className="h-[30px] w-[30px] rounded-full"
            />
          ) : (
            <div className="h-[30px] w-[30px]">
              <DefaultProfile />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2 font-bold">
              <a
                href={`/profile/${comment.userId}`}  // Replace with the correct URL structure
                className="text-blue-500 hover:underline"
              >
                {comment.profileSection?.profileName}
              </a>
            </div>
            <div className="ml-auto flex items-center justify-center gap-1">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">
                  {formatRelativeTime(comment.createdAt)}
                </p>
                {comment.history?.length > 0 ? (
                  <p className="text-right text-xs text-gray-500">(Edited)</p>
                ) : null}
              </div>
              <div>
                <img
                  src="/src/assets/svgs/ThreeDots.svg"
                  alt="Three dots"
                  onClick={toggleDropdown}
                  className="cursor-pointer"
                  width="20px"
                  height="20px"
                />
                {isDropdownOpen && (
                  <MenuDropDown
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewHistory={handleViewHistory}
                    creatorId={comment.userId}
                  />
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <CommentEditor
              commentId={comment._id}
              initialContent={comment.content}
              onSave={() => {
                setIsEditing(false);
                window.location.reload();
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p className="w-[570px] whitespace-normal break-words text-sm text-gray-800">
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {isHistoryModalOpen && (
        <CommentHistoryModal
          currentEntryId={comment._id}
          history={comment.history}
          onClose={() => setIsHistoryModalOpen(false)}
          isOwner={id === comment.userId}
        />
      )}
    </div>
  );
};

export default CommentItem;
