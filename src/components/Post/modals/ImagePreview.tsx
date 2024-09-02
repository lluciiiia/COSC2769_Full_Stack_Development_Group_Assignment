import React from "react";

interface ImagePreviewProps {
  image: string;
  index: number;
  setImages: (images: string[]) => void;
  images: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  index,
  setImages,
  images,
}) => {
  const handleRemoveImage = () => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="relative h-24 w-24">
      <img
        src={image}
        alt={`Upload Preview ${index + 1}`}
        className="h-full w-full rounded-md object-cover"
      />
      <button
        type="button"
        onClick={handleRemoveImage}
        className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
      >
        &times;
      </button>
    </div>
  );
};

export default ImagePreview;
