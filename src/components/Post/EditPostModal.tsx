import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import PostForm from "./PostForm";
import { updatePost } from "../../controllers/posts";

const EditPostModal = ({ isOpen, onClose, userId, post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<
    "PUBLIC" | "FRIEND_ONLY" | "GROUP"
  >("PUBLIC");
  const [imageURL, setImageURL] = useState("");

  // Effect to populate the modal fields with existing post data
  useEffect(() => {
    if (isOpen && post) {
      setContent(post.content);
      setVisibility(post.visibility);
      setImageURL(post.imageURL);
    }
  }, [isOpen, post]);

  const handleUpdatePost = async () => {
    try {
      const postData: PostParams = {
        ...post, // Include existing post data
        content,
        visibility,
        imageURL,
      };
      const result = await dispatch(updatePost(postData)).unwrap();
      console.log("Post updated successfully:", result);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred while updating the post");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdatePost();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Edit Your Post</h2>
        <PostForm
          content={content}
          setContent={setContent}
          visibility={visibility}
          setVisibility={setVisibility}
          imageURL={imageURL}
          setImageURL={setImageURL}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditPostModal;
