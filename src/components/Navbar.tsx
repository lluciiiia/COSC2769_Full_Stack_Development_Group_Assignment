import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "../assets/icons/profileIcon/SearchIcon";
import logo from "../assets/icons/logo.png";
import notificationIcon from "../assets/icons/notificationIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import createPostIcon from "../assets/icons/createPostIcon.png";

import { NavItem } from "./NavItem";
import PostModal from "./posts/modals/PostModal";
import NotificationModal from "./notifications/NotificationModal";
import ProfileButtonModal from "./ProfileButtonModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchNotification } from "../controllers/notifications";
import { Notifications } from "../interfaces/Notifications";
import { selectNotifications } from "../features/notificationSlice";
import { selectAuthState } from "../features/authSlice";
const Navbar = () => {
  const currentUser = useSelector(selectAuthState);
  const navigate = useNavigate();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const notifications: Notifications[] = useSelector(selectNotifications);
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const handleHomeClick = () => {
    navigate(`/home`);
  };

  const handleCreatePostClick = () => {
    setIsPostModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPostModalOpen(false);
  };

  const handleGroupClick = () => {
    navigate(`/groups`);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    setIsNotificationModalOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
    setIsProfileModalOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/user-search`);
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-[#FFC123] p-2">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={handleHomeClick}
        >
          <img
            src={logo}
            alt="BuZzNet Logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-2xl font-bold">BuZzNet</h1>
        </div>
        {/* <div className="relative flex items-center gap-4"></div> */}
        <div className="flex max-w-xs flex-1 flex-grow justify-around gap-1">
          <SearchIcon
            className="mr-2 h-10 w-10 cursor-pointer text-black"
            onClick={handleSearchClick}
          />
          <NavItem src={homeIcon} label="Home" onClick={handleHomeClick} />
          <NavItem src={groupIcon} onClick={handleGroupClick} label="Group" />
          <NavItem
            src={createPostIcon}
            onClick={handleCreatePostClick}
            label="Create Post"
          />
        </div>
        <div className="mr-6 flex justify-between gap-5">
          <NavItem
            src={notificationIcon}
            label="Notification"
            onClick={handleNotificationClick}
          />
          {notifications.length > 0 && (
            <div className="absolute right-32 top-1 z-10 h-2 w-2 rounded-full bg-red-600"></div>
          )}
          <NavItem
            src={profileIcon}
            label="Profile"
            onClick={handleProfileClick}
          />
        </div>
      </nav>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        notifications={notifications}
      />

      <ProfileButtonModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsProfileModalOpen}
        imgUrl={currentUser.profilePictureURL}
        name={currentUser.name}
      />
      <PostModal
        isOpen={isPostModalOpen}
        onClose={handleCloseModal}
        userId={currentUser.id}
        post={null}
        groupId={""}
        isInGroupPage={''}
      />
    </>
  );
};

export default Navbar;
