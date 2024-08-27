import React, { useState } from "react";
import { ProfileSectionParams } from "../../interfaces/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostById } from "../../controllers/posts";
import MenuDropDown from "../MenuDropDown";

export const ProfileSection: React.FC<ProfileSectionParams> = ({
  profileImage,
  profileName,
  postId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    setIsDropdownOpen(false);
    try {
      const response = await deletePostById(postId);
      if (!response) {
        alert("Failed to delete the post. Please try again.");
      } else {
        navigate(`/home/${userId}`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while trying to delete the post.");
    }
  };

  const safeProfileImage =
    profileImage !== undefined ? profileImage : "default-image-url.jpg";
  const safeProfileName = profileName !== undefined ? profileName : "Undefined";

  return (
    <div className="relative flex items-start p-6">
      <div className="mr-4 flex-shrink-0">
        <img
          src={safeProfileImage}
          alt="Profile"
          className="h-[50px] w-[50px] rounded-full"
        />
      </div>
      <div>
        <div className="font-bold">{safeProfileName}</div>
      </div>
      <div className="relative ml-auto">
        <img
          src="/src/assets/svgs/ThreeDots.svg"
          alt="Three dots"
          onClick={toggleDropdown}
          className="cursor-pointer"
        />
        {isDropdownOpen && (
          <MenuDropDown onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};