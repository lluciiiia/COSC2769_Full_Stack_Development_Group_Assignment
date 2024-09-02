import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import { updateUser } from "../../controllers/user";
import { updateLocalUser } from "../../features/userSlice";
import { fetchSess } from "../../features/authSlice";
import imageCompression from "browser-image-compression";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
}

const RModal: React.FC<ModalProps> = ({ isOpen, onClose, currentAvatar }) => {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user.currentUser);
  const [avatar, setAvatar] = useState<string>(currentAvatar);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setAvatar(currentAvatar);
  }, [currentAvatar]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the file is larger than the desired limit, e.g., 2MB
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert("File is too large. Please upload an image smaller than 2MB.");
        return;
      }

      // Compress the image if needed
      const options = {
        maxSizeMB: 1, // Desired max size in MB
        maxWidthOrHeight: 1024, // Max width/height in pixels
        useWebWorker: true, // Use web workers for faster compression
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);

        const base64 = await convertToBase64(compressedFile);
        setAvatar(base64 as string);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = () => {
    if (avatar) {
      const updatedUser = { ...user, profilePictureURL: avatar };
      dispatch(updateLocalUser(updatedUser));
      dispatch(updateUser({ userId: user._id, userData: updatedUser }));
      dispatch(fetchSess());
      window.location.reload();

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-1/3 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Edit Profile Image</h2>

        {/* Image Preview */}
        <div className="mb-4 flex justify-center">
          <img
            src={avatar}
            alt="Profile Preview"
            className="h-32 w-32 rounded-full border"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded bg-[#FFC123] px-6 py-2 text-white hover:opacity-40"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RModal;
