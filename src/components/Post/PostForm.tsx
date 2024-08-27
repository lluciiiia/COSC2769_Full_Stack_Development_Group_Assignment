import React from "react";
import { PostFormProps } from "../../interfaces/Posts";

const PostForm: React.FC<PostFormProps> = ({
  content,
  setContent,
  visibility,
  setVisibility,
  imageURL,
  setImageURL,
  onSubmit,
  onClose,
  isEdit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-bold font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="mt-1 block w-full resize rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's buzzing?"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold font-medium text-gray-700">
              Visibility
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={visibility}
              onChange={(e) =>
                setVisibility(
                  e.target.value as "PUBLIC" | "FRIEND_ONLY" | "GROUP",
                )
              }
            >
              <option value="PUBLIC">Public</option>
              <option value="FRIEND_ONLY">Friends Only</option>
              <option value="GROUP">Group</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://via.placeholder.com/150"
            />
          </div>

          {imageURL && (
            <div className="mb-4">
              <img
                src={imageURL}
                alt="Post Image"
                className="h-auto w-full rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="mr-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#FFC123] px-4 py-2 text-black"
        >
          {isEdit ? "Edit" : "Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
