import React, { useEffect, useState } from "react";

import { UserType } from "../../interfaces/Users";
import renderContent from "./ProfileModalUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import { updateLocalUser } from "../../features/userSlice";
import { updateUser } from "../../controllers/users";
import { fetchSess } from "../../features/authSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("User Info");

  const user = useSelector((state: AppState) => state.user.currentUser);
  const [formData, setFormData] = useState<UserType>({ ...user });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateLocalUser(formData));
    dispatch(updateUser({ userId: user._id, userData: formData }));
    dispatch(fetchSess);
    window.location.reload();

    onClose();
  };

  const tabs = ["User Info", "Work", "Education", "Relationship", "Contact"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-2/3 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Edit Profile</h2>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4">
            {tabs.map((tab: string) => {
              return (
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 ${activeTab === tab ? "border-b-2 border-blue-500" : "border-none"}`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="mb-4">
          {renderContent(activeTab, formData, handleInputChange)}
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

export default ProfileEditModal;
