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
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-700">
              Content
            </label>
            <textarea
              className="mt-2 block w-full resize rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's buzzing?"
              rows={6}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-700">
              Visibility
            </label>
            <select
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">
              Image
            </label>
            <input
              type="text"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://via.placeholder.com/150"
            />
          </div>

          {imageURL && (
            <div className="mb-6">
              <img
                src={imageURL}
                alt="Post Image"
                className="h-auto w-full rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="mr-4 rounded-md bg-gray-300 px-6 py-3 text-lg text-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#FFC123] px-6 py-3 text-lg text-black"
        >
          {isEdit ? "Edit" : "Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
