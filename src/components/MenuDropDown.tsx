import React, { useState } from "react";
import ConfirmationModal from "./post/ConfirmationModal";

interface MenuDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MenuDropDown: React.FC<MenuDropDownProps> = ({ onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="absolute right-0 mt-2 w-28 rounded-md bg-white shadow-xl">
        <button
          onClick={onEdit}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
        >
          Delete
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
