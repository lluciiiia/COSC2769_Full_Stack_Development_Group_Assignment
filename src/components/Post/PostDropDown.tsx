import React from "react";

interface PostDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const PostDropDown: React.FC<PostDropDownProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-0 mt-2 w-28 rounded-md bg-white shadow-xl">
      <button
        onClick={onEdit}
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  );
};

export default PostDropDown;
