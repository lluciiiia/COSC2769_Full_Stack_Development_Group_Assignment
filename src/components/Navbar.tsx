import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "../assets/icons/profileIcon/SearchIcon";
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
import { selectAuthState } from "../features/authSlice";

const Navbar = () => {
  const currentUser = useSelector(selectAuthState);
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

  const handleSearchClick = () => {
    navigate(`/UserSearch`);
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
        <div className="relative flex items-center gap-4">
          <SearchIcon
            className="h-8 w-8 cursor-pointer text-black"
            onClick={handleSearchClick}
          />
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
            label="Notification"
            onClick={handleNotificationClick}
          />
          <NavItem
            src={profileIcon}
            label="Profile"
            onClick={handleProfileClick}
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
        groupId={""}
      />
    </>
  );
};

export default Navbar;
