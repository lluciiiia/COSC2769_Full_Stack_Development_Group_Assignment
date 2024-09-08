import React from "react";
import ImagePreview from "./ImagePreview.tsx";

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter((file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      );
      Promise.all(validImages.map(convertToBase64)).then((base64Images) => {
        setImages([...images, ...base64Images]);
      });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
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
            <ImagePreview
              key={index}
              image={image}
              index={index}
              setImages={setImages}
              images={images}
            />
          ))}
          {images.length > 4 && (
            <div className="relative flex h-24 w-24 items-center justify-center rounded-md bg-gray-200 text-lg font-bold text-gray-600">
              +{images.length - 4} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
