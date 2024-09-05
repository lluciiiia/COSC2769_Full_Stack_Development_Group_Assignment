import React, { useState, useEffect } from "react";
import ConfirmationModal from "./post/ConfirmationModal";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
import { selectGroupById } from "../features/groupSlice";
import { AppState } from "../app/store";

interface MenuDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
  onViewHistory: () => void;
  creatorId: string;
  groupId?: string;
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({
  onEdit,
  onDelete,
  onViewHistory,
  creatorId,
  groupId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useSelector(selectAuthState); // The authenticated user's ID
  const [isGroupAdmin, setIsGroupAdmin] = useState(false); // State to track if the user is a group admin

  // Fetch the group data using the groupId
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId)
  );

  // Check if the authenticated user is the owner of the post
  const isOwner = id === creatorId;

  // Check if the authenticated user is the group admin
  useEffect(() => {
    if (group && group.groupAdmin === id) {
      setIsGroupAdmin(true);
    } else {
      setIsGroupAdmin(false);
    }
  }, [group, id]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative z-20">
      <div className="absolute right-0 mt-2 w-36 rounded-md border bg-white shadow-xl">
        {/* Only the owner can edit */}
        {isOwner && (
          <button
            onClick={onEdit}
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md hover:bg-gray-100"
          >
            Edit
          </button>
        )}

        {/* Both the owner and group admin can delete */}
        {(isOwner || isGroupAdmin) && (
          <button
            onClick={handleDeleteClick}
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm text-gray-700 last:rounded-b-md hover:bg-gray-100"
          >
            Delete
          </button>
        )}

        <button
          onClick={onViewHistory}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
        >
          View Edit History
        </button>
      </div>

      {/* Confirmation Modal for Delete */}
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to permanently delete this item?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default MenuDropDown;
