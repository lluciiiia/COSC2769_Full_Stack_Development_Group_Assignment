import React from 'react';
import { AdminSectionProps } from '../../interfaces/Posts';
import { ViewIcon } from '../../assets/icons/ViewIcon';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { useNavigate } from 'react-router-dom';
import { deletePostById } from '../../controllers/posts';

export const AdminSection: React.FC<AdminSectionProps> = ({
  handleClick,
  post,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!post || !post._id) {
      console.error("Post or post._id is undefined");
      alert("Unable to delete post. Post information is missing.");
      return;
    }

    try {
      const response = await deletePostById(post._id);
      if (!response) {
        alert("Failed to delete the post. Please try again.");
      } else {
        navigate('/admin'); // Redirect to admin page or another appropriate page
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while trying to delete the post.");
    }
  };

  return (
    <div className="flex justify-between p-4">
      <button
        className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-blue-100"
        onClick={handleClick}
      >
        <ViewIcon className="h-5 w-5" fill="currentColor" />
        <span>View info</span>
      </button>
      <button
        className="flex items-center space-x-2 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
        onClick={handleDelete}
      >
        <DeleteIcon className="h-5 w-5" fill="currentColor" />
        <span>Delete</span>
      </button>
    </div>
  );
};
