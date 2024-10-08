import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TabContent from "../components/profiles/TabContent";
import ProfileHeader from "../components/profiles/ProfileHeader";
import TabNavigation from "../components/profiles/TabNavigation";
import { getUser, getViewedUser } from "../controllers/users";
import ProfileEditModal from "../components/profiles/ProfileEditModal";
import LoadingSpinner from "../assets/icons/Loading";
import { selectAuthState } from "../features/authSlice";
import { selectCurrentUser, selectViewedUser } from "../features/userSlice";
import { fetchSentFriendRequests } from "../controllers/notifications";

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { id } = useSelector(selectAuthState);
  const { profileId } = useParams();

  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileId === id) {
      dispatch(getUser(id)).finally(() => {
        setLoading(false);
      });
    } else {
      dispatch(getViewedUser(profileId)).finally(() => {
        setLoading(false);
      });
    }

    dispatch(fetchSentFriendRequests());
  }, [profileId, id, dispatch, location.key]);

  const viewedUser = useSelector(selectViewedUser);
  const currentUser = useSelector(selectCurrentUser);

  const isAuthenticatedUser = profileId === id;
  const user = isAuthenticatedUser ? currentUser : viewedUser;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Posts");

  const numberOfFriend = user?.friends?.length;

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white pt-16">
        <ProfileHeader
          name={user?.name}
          bio={user?.bio}
          avatar={user?.profilePictureURL}
          background={user?.backgroundPictureURL}
          friends={user?.friends}
          handleEditProfile={handleEditProfile}
          isAuthenticatedUser={isAuthenticatedUser}
        />

        <div className="mt-20 w-full px-10">
          <p>
            {numberOfFriend} <span className="opacity-50">friends</span>
          </p>

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="mt-1 w-full border-b-2"></div>

        <div className="mt-8 w-full max-w-4xl px-3">
          <TabContent
            activeTab={activeTab}
            userId={user?._id?.toString()}
            isAuthenticatedUser={isAuthenticatedUser}
          />
        </div>
      </div>

      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Profile;
