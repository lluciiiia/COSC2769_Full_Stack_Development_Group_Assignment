import React, { useState } from "react";
import MenuDropDown from "../MenuDropDown";
import { CommentProps } from "../../interfaces/Comments";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { deleteCommentById, updateComment } from "../../controllers/comments";
import CommentHistoryModal from "./CommentHistoryModal";

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

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

  const handleSave = async () => {
    try {
      const response = await updateComment(comment._id, { content });
      if (!response) {
        alert("Failed to update the comment. Please try again.");
      } else {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("An error occurred while trying to update the comment.");
    }
  };

  const handleCancel = () => {
    setContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="w-[650px] rounded-md bg-white p-2 shadow-sm">
      <div className="flex">
        <div className="mr-2 flex-shrink-0">
          <img
            src={comment.profileSection.profileImage}
            alt="Profile"
            className="h-[30px] w-[30px] rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2 font-bold">
              {comment.profileSection.profileName}
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
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
                rows={1}
                style={{ resize: "vertical" }} // Allow vertical resizing
                onInput={(e) => {
                  e.currentTarget.style.height = "auto"; // Reset height
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Adjust height based on content
                }}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="rounded-md bg-gray-300 px-2 py-1 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-md bg-[#FFC123] px-2 py-1 text-sm text-black"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="w-[570px] whitespace-normal break-words text-sm text-gray-800">
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {/* Modal for viewing edit history */}
      {isHistoryModalOpen && (
        <CommentHistoryModal
          history={comment.history}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CommentItem;
