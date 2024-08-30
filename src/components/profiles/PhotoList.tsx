import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";

const PhotoList: React.FC = () => {
  const posts = useSelector((state: AppState) => state.posts.creatorPost);
  console.log(posts);

  const images = posts.find((p) => !p.imageURL);
  console.log(images);

  if (posts.length === 0) {
    return <h1>No photo available</h1>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posts.map((photo) => {
        if (photo.imageURL) {
          return (
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
          );
        }

        return null;
      })}
    </div>
  );
};

export default PhotoList;
