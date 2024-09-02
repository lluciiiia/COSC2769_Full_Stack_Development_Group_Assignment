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

    const postParams = {
      content,
      visibility,
      images,
    };

    onSubmit(postParams);
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
