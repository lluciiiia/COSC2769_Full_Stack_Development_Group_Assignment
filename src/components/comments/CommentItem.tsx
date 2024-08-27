import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuDropDown from "../MenuDropDown";
import { CommentProps } from "../../interfaces/Comments";
import { formatRelativeTime } from "../../utils/formatRelativeTime";

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
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
    // try {
    //   const response = await deletePostById(postId);
    //   if (!response) {
    //     alert("Failed to delete the post. Please try again.");
    //   } else {
    //     navigate(`/home/${userId}`);
    //     window.location.reload();
    //   }
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    //   alert("An error occurred while trying to delete the post.");
    // }
  };

  return (
    <div className="rounded-md bg-white p-2 shadow-sm">
      <div className="flex">
        <div className="mr-2 flex-shrink-0">
          <img
            src={comment.profileSection.profileImage}
            alt="Profile"
            className="h-[30px] w-[30px] rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="mr-2 font-bold">
              {comment.profileSection.profileName}
            </div>
            <div className="ml-auto flex items-center justify-center gap-1">
              <p className="text-xs text-gray-500">
                {formatRelativeTime(comment.createdAt)}
              </p>
              <div>
                <img
                  src="/src/assets/svgs/ThreeDots.svg"
                  alt="Three dots"
                  onClick={toggleDropdown}
                  className="cursor-pointer"
                  width="20px"
                  height="20px"
                />
                {isDropdownOpen && (
                  <MenuDropDown onEdit={handleEdit} onDelete={handleDelete} />
                )}
              </div>
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
