import { useSelector } from "react-redux";
import { getUserById } from "../features/userSlice";
import { AppState } from "../app/store";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import React, { useState } from "react";
import { UserType } from "../interfaces/Users";
import TabContent from "../components/profiles/TabContent";
import ProfileHeader from "../components/profiles/ProfileHeader";
import TabNavigation from "../components/profiles/TabNavigation";
import ProfileInformation from "../components/profiles/ProfileInformation";
import Modal from "../components/profiles/ProfileEditModal";

const Profile = () => {
  const { userId } = useParams();

  const user: UserType | undefined = useSelector((state: AppState) => {
    return getUserById(state, Number(userId));
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts"); // Initialize activeTab state

  if (user === undefined) {
    return <ErrorPage />;
  }

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white pt-16">
        <ProfileHeader />

        <div className="mt-16 w-full px-10">
          <ProfileInformation
            name={user.name}
            bio={user.Bio}
            onEditProfile={handleEditProfile}
          />

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="mt-1 w-full border-b-2"></div>

        <div className="mt-8 w-full max-w-4xl px-3">
          <TabContent activeTab={activeTab} userId={userId?.toString()} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={user} />
    </>
  );
};
export default Profile;
