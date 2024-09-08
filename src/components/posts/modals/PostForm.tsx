import React from "react";
import ContentInput from "./ContentInput";
import ImageUploader from "./ImageUploader";
import SubmitButtons from "./SubmitButtons";
import { PostFormProps } from "../../../interfaces/Posts";

const PostForm: React.FC<PostFormProps> = ({
  content,
  setContent,
  visibility,
  images,
  setImages,
  onSubmit,
  onClose,
  isEdit,
}) => {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
  
    // Append the content and visibility to FormData
    formData.append("content", content);
    formData.append("visibility", visibility);
  
    // Append each image from the images array to FormData
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);  // Assumes `image` is a file, adjust if it's a URL
    });
  
    // Pass the FormData object to onSubmit
    onSubmit(formData);
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <ContentInput content={content} setContent={setContent} />
        <ImageUploader images={images} setImages={setImages} />
      </div>
      <SubmitButtons onClose={onClose} isEdit={isEdit} />
    </form>
  );
};

export default PostForm;
