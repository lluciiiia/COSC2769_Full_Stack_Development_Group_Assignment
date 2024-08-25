import React from "react";
import { useParams } from "react-router-dom";
import PhotoGrid from "./PhotoGrid";
import { PostParams } from "../../interfaces/Posts";
import { getPostListById } from "../../features/postsSlice";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";

const PhotoList: React.FC = () => {
  const { userId } = useParams();

  const filteredPosts: PostParams[] = useSelector(
    (state: AppState): PostParams[] => {
      console.log("lamo");
      return getPostListById(state, Number(userId));
    },
  );

  return <PhotoGrid photos={filteredPosts} />;
};

export default PhotoList;
