import React from "react";
import { PhotoProps } from "../../interfaces/PhotoProps";

interface PhotoGridProps {
  photos: PhotoProps[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={photo.src}
            alt={`Photo ${photo.id}`}
            className="h-[300px] w-[300px] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
