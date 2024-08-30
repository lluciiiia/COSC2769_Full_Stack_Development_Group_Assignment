import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../app/store";
import ErrorPage from "./ErrorPage";
import React, { useEffect, useRef, useState } from "react";
import TabContent from "../components/profiles/TabContent";
import ProfileHeader from "../components/profiles/ProfileHeader";
import TabNavigation from "../components/profiles/TabNavigation";
import { getUser } from "../controllers/user";
import ProfileEditModal from "../components/profiles/ProfileEditModal";
import LoadingSpinner from "../assets/icons/Loading";
import { selectAuthState } from "../features/authSlice";

const Profile = () => {
  const { id } = useSelector(selectAuthState);
  const dispatch: AppDispatch = useDispatch();

  const firstRender = useRef(true);
  const user = useSelector((state: AppState) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Posts");

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getUser(id)).finally(() => {
        firstRender.current = false;
        setLoading(false);
      });
    }
  }, [dispatch]);

  const numberOfFriend = user?.friends?.length;

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    // Show loading spinner while fetching user data
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Avoid other users accessing the current user page
  if (user && user._id !== id) return <ErrorPage />;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white pt-16">
        <ProfileHeader
          name={user.name}
          bio={user.bio}
          avatar={user.profilePictureURL}
          handleEditProfile={handleEditProfile}
        />

        <div className="mt-20 w-full px-10">
          <p>
            {numberOfFriend} <span className="opacity-50">friends</span>
          </p>

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="mt-1 w-full border-b-2"></div>

        <div className="mt-8 w-full max-w-4xl px-3">
          <TabContent activeTab={activeTab} userId={id?.toString()} />
        </div>
      </div>

      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Profile;
