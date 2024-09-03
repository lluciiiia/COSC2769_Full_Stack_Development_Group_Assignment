import React, { useState, useEffect } from "react";

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newDescription: string) => void;
  initialDescription: string;
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({ isOpen, onClose, onSave, initialDescription }) => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleSave = () => {
    onSave(description);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full mx-4">
        <h2 className="text-2xl font-semibold mb-6">Edit Group Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 resize-none"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
