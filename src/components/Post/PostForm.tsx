import React from "react";
import { PostFormProps } from "../../interfaces/Posts";

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter((file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      );
      // Convert files to base64 and update state
      Promise.all(validImages.map(convertToBase64)).then((base64Images) => {
        setImages([...images, ...base64Images]);
      });
    }
  };

  // Helper function to convert image file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Instead of FormData, create an object to send
    const postParams = {
      content,
      visibility,
      images, // This will now contain base64 strings
    };

    onSubmit(postParams); // Pass the postParams directly
  };

  const handleRemoveImage = (index: number) => {
    // Create a new array without the removed image
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 gap-6">
        {/* Content Field */}
        <div>
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-700">
              Content
            </label>
            <textarea
              className="mt-2 block w-full resize rounded-md border-gray-300 p-4 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's buzzing?"
              rows={6}
              required
            />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <label className="cursor-pointer rounded-md bg-[#FFC123] px-4 py-2 text-lg text-black shadow-sm hover:bg-yellow-500">
            Upload Images
            <input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative h-24 w-24">
                  <img
                    src={image} // Displaying base64 images directly
                    alt={`Upload Preview ${index + 1}`}
                    className="h-full w-full rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {images.length > 4 && (
                <div className="relative flex h-24 w-24 items-center justify-center rounded-md bg-gray-200 text-lg font-bold text-gray-600">
                  +{images.length - 4} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
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
