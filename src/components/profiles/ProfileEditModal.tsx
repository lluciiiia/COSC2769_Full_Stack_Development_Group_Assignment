// Modal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserType } from '../../interfaces/Users';

import { updateUser } from '../../features/userSlice';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.Bio || '');
  const [profilePictureURL, setProfilePictureURL] = useState(user.profilePictureURL || '');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Dispatch action to update user profile
    dispatch(updateUser({ ...user, name, Bio: bio, profilePictureURL }));
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Profile Picture URL:</label>
          <input
            type="text"
            value={profilePictureURL}
            onChange={(e) => setProfilePictureURL(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
