import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import LoadingSpinner from "../../assets/icons/Loading";

const PhotoList = ({ isAuthenticatedUser, loading }) => {
  const posts: PostParams[] = useSelector((state: AppState) => {
    return isAuthenticatedUser
      ? state.posts.creatorPost
      : state.posts.viewedPosts;
  });

  if (loading) {
    return (
      <div className="flex h-[50%] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (posts.length === 0) return <h1>No photo available</h1>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posts.map((post) => {
        return post.images
          ? post.images.map((image, index) => (
              <div
                key={`${post._id}-${index}`}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={image}
                  alt={`Photo ${post._id}-${index}`}
                  className="h-[300px] w-[300px] object-cover transition-transform duration-200 hover:scale-125"
                />{" "}
              </div>
            ))
          : null;
      })}
    </div>
  );
};

export default PhotoList;
