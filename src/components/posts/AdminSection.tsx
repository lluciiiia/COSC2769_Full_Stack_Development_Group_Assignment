import React from 'react';
import { AdminSectionProps } from '../../interfaces/Posts';
import { ViewIcon } from '../../assets/icons/ViewIcon';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { deletePostById, getAllPosts } from '../../controllers/posts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

export const AdminSection: React.FC<AdminSectionProps> = ({
  handleClick,
  post,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    if (!post || !post._id) {
      console.error("Post or post._id is undefined");
      alert("Unable to delete post. Post information is missing.");
      return;
    }
    try {
      dispatch(deletePostById(post._id)).then(() => {
        dispatch(getAllPosts());
      });
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
