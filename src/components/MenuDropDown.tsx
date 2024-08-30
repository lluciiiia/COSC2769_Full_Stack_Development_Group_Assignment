import React, { useState } from "react";
import ConfirmationModal from "./post/ConfirmationModal";
import { useParams } from "react-router-dom";

interface MenuDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
  onViewHistory: () => void;
  creatorId: string;
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({
  onEdit,
  onDelete,
  onViewHistory,
  creatorId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();
  const isOwner = userId === creatorId;

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
    <div className="relative">
      <div className="absolute right-0 mt-2 w-36 rounded-md border bg-white shadow-xl">
        {isOwner && (
          <>
            <button
              onClick={onEdit}
              className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm text-gray-700 last:rounded-b-md hover:bg-gray-100"
            >
              Delete
            </button>
          </>
        )}
        <button
          onClick={onViewHistory}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
        >
          View Edit History
        </button>
      </div>

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
