import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createpost } from "../../controllers/posts.tsx";
import { AppDispatch } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import PostForm from "./PostForm";

const CreatePostModal = ({ isOpen, onClose, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState(""); 
  const [visibility, setVisibility] = useState<"PUBLIC" | "FRIEND_ONLY" | "GROUP">("PUBLIC"); 
  const [imageURL, setImageURL] = useState("https://via.placeholder.com/150"); 

  const handleCreatePost = async () => {
    try {
      const postData: PostParams = {
        creatorId: userId,
        content: content, 
        visibility: visibility, 
        imageURL: imageURL, 
      };

      const result = await dispatch(createpost(postData)).unwrap();
      console.log("Post created successfully:", result);

      // Auto-refresh the page after the post is created
      window.location.reload();

      // Optionally close the modal
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePost();
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Increased width and padding */}
      <div className="bg-white rounded-lg p-8 w-1/2 z-60 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Buzz your mind!</h2>
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

export default CreatePostModal;
