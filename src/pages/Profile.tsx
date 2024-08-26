import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../app/store";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import React, { useEffect, useRef, useState } from "react";
import TabContent from "../components/profiles/TabContent";
import ProfileHeader from "../components/profiles/ProfileHeader";
import TabNavigation from "../components/profiles/TabNavigation";
import Modal from "../components/profiles/ProfileEditModal";
import { getUser } from "../controllers/user";
import ProfileEditModal from "../components/profiles/ProfileEditModal";

const Profile = () => {
  const { userId } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const firstRender = useRef(true);
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getUser(userId));
      firstRender.current = false;
    }
  });

  const numberOfFriend = user.friends?.length;

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
        <ProfileHeader
          name={user.name}
          bio={user.bio}
          avatar={user.profilePictureURL}
        />

        <div className="mt-20 w-full px-10">
          <p>
            {numberOfFriend} <span className="opacity-50">friends</span>
          </p>

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="mt-1 w-full border-b-2"></div>

        <div className="mt-8 w-full max-w-4xl px-3">
          <TabContent activeTab={activeTab} userId={userId?.toString()} />
        </div>
      </div>

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </>
  );
};
export default Profile;
