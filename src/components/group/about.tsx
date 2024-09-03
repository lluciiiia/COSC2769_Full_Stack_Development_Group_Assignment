import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { selectGroupById } from "../../features/groupSlice";
import { selectAuthState } from "../../features/authSlice";
import EditGroupModal from "./EditGroupModal"; // Ensure this path is correct

const About: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId)
  );
  const { id: currentUserId } = useSelector(selectAuthState);

  const description = group?.description || "No description available.";
  const isAdmin = group?.groupAdmin === currentUserId;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveDescription = (newDescription: string) => {
    console.log("New description to save:", newDescription);
    // Implement dispatch logic to save the updated description here
    // For now, we just close the modal
    setIsEditModalOpen(false);
  };

  return (
    <div className="mx-auto flex max-w-3xl rounded-lg bg-yellow-50 p-6">
      <div className="flex-shrink-0 rounded-l-lg border-r border-gray-300 px-4 py-2 font-semibold text-yellow-900">
        Overview
      </div>

      <div className="ml-4 text-gray-800 flex-grow">
        <p>{description}</p>
        {isAdmin && (
          <button
            onClick={handleEditClick}
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>

      {/* Edit Group Modal */}
      <EditGroupModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveDescription}
        initialDescription={description}
      />
    </div>
  );
};

export default About;
