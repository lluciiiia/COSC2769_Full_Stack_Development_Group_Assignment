// src/components/CreatePostModal.tsx
import React, { useState } from "react";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Buzz your mind!</h2>
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
