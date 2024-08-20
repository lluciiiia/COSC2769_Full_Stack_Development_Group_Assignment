import React from 'react';
import { PhotoProps } from '../../interfaces/PhotoProps';

interface PhotoGridProps {
  photos: PhotoProps[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {photos.map(photo => (
        <div key={photo.id} className="relative overflow-hidden rounded-lg shadow-md">
          <img src={photo.src} alt={`Photo ${photo.id}`} className="object-cover w-[300px] h-[300px]" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
