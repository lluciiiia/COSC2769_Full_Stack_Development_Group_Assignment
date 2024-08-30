import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/icons/logo.png";
import notificationIcon from "../assets/icons/notificationIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import createPostIcon from "../assets/icons/createPostIcon.png";
import { NavItem } from "./NavItem";
import PostModal from "./post/PostModal";
import NotificationModal from "./notifications/NotificationModal";
import ProfileButtonModal from "./ProfileButtonModal";
import { useSelector } from "react-redux";
import { AppState } from "../app/store";

const Navbar = () => {
  const currentUser = useSelector((state: AppState) => state.auth);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-[#FFC123] p-2">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="BuZzNet Logo"
            className="h-12 w-12 cursor-pointer object-contain"
            onClick={handleHomeClick}
          />
          <h1 className="text-2xl font-bold">BuZzNet</h1>
        </div>
        <div className="flex max-w-xs flex-1 flex-grow justify-around gap-5">
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
            label={"Notification"}
            onClick={() => {
              handleNotificationClick();
            }}
          />
          <NavItem
            src={profileIcon}
            onClick={() => {
              handleProfileClick();
            }}
            label={"Profile"}
          />
        </div>
      </nav>

      <NotificationModal isOpen={isNotificationModalOpen} />
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
      />
    </>
  );
};
export default Navbar;
