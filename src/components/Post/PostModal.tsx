import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import PostForm from "./PostForm";
import { createPost, updatePost } from "../../controllers/posts";

const PostModal = ({ isOpen, onClose, userId, post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<
    "PUBLIC" | "FRIEND_ONLY" | "GROUP"
  >("PUBLIC");
  const [imageURL, setImageURL] = useState("");

  // Effect to populate the modal fields with existing post data if editing
  useEffect(() => {
    if (isOpen && post) {
      setContent(post.content);
      setVisibility(post.visibility);
      setImageURL(post.imageURL);
    } else if (isOpen) {
      // Reset fields if creating a new post
      setContent("");
      setVisibility("PUBLIC");
      setImageURL("");
    }
  }, [isOpen, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData: PostParams = {
        creatorId: userId,
        content,
        visibility,
        imageURL,
      };

      let result;
      if (post) {
        // Editing an existing post
        result = await dispatch(
          updatePost({ ...postData, _id: post._id }),
        ).unwrap();
        console.log("Post updated successfully:", result);
      } else {
        // Creating a new post
        result = await dispatch(createPost(postData)).unwrap();
        console.log("Post created successfully:", result);
      }

      onClose();
      window.location.reload(); // Refresh to see the new/updated post
    } catch (error) {
      console.error("Error saving post:", error);
      alert("An error occurred while saving the post");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {post ? "Edit Your Post" : "Buzz your mind!"}
        </h2>
        <PostForm
          content={content}
          setContent={setContent}
          visibility={visibility}
          setVisibility={setVisibility}
          imageURL={imageURL}
          setImageURL={setImageURL}
          onSubmit={handleSubmit}
          onClose={onClose}
          isEdit={!!post}
        />
      </div>
    </div>
  );
};

export default PostModal;
