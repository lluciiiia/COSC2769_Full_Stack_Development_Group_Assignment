import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";

const PhotoList: React.FC = () => {
  const posts = useSelector((state: AppState) => state.posts.creatorPost);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posts.map((photo) => (
        <div
          key={photo._id}
          className="relative overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={photo.imageURL}
            alt={`Photo ${photo._id}`}
            className="h-[300px] w-[300px] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
