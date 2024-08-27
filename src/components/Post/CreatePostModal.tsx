import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createpost } from "../../controllers/posts.tsx";
import { AppDispatch } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";

const CreatePostModal = ({ isOpen, onClose, userId }) => {
  const dispatch = useDispatch<AppDispatch>(); 


  useEffect(() => {
    const sendTestRequest = async () => {
      if (isOpen) {
        try {
          const postData : PostParams = {
            creatorId: userId,
            content: "Test connection", 
            visibility: "FRIEND_ONLY", 
            imageURL: "https://via.placeholder.com/150", 
          };

          // Dispatch the thunk action
          const result = await dispatch(createpost(postData)).unwrap();

          console.log("Post created successfully:", result);
          alert("Post created successfully!");
          onClose(); // Close the modal on success
        } catch (error) {
          console.error("Error creating post:", error);
          alert("An error occurred while creating the post");
        }
      }
    };

    sendTestRequest();
  }, [isOpen, dispatch, userId, onClose]); // Trigger effect when modal opens

  if (!isOpen) return null; // If modal is not open, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Creating Post...</h2>
        <p>Please wait while we send a test request.</p>
      </div>
    </div>
  );
};

export default CreatePostModal;
