import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../assets/icons/logo.png";
import notificationIcon from "../assets/icons/notificationIcon.png";
import profileIcon from "../assets/icons/profileIcon.png";
import homeIcon from "../assets/icons/homeIcon.png";
import groupIcon from "../assets/icons/groupIcon.png";
import createPostIcon from "../assets/icons/createPostIcon.png";
import { NavItem } from "./NavItem";
import PostModal from "./post/PostModal";

const Navbar = () => {
  const { userId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/home/${userId}`);
  };

  const handleCreatePostClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleGroupClick = () => {
    navigate(`/groups`);
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
          <NavItem src={notificationIcon} label={"Notification"} />
          <NavItem src={profileIcon} label={"Profile"} />
        </div>
      </nav>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
        post={null}
      />
    </>
  );
};
export default Navbar;
