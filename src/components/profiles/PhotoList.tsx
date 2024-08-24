import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import PhotoGrid from "./PhotoGrid";
import { PostParams } from "../../interfaces/Posts";
import { fetchPosts, getPostListById } from "../../features/postsSlice";

const PhotoList: React.FC = () => {
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(fetchPosts());
      firstRender.current = false;
    }
  }, []);
  const filteredPosts: PostParams[] = useSelector(
    (state: AppState): PostParams[] => {
      console.log('lamo');
      return getPostListById(state, Number(userId));
    },
  );

  return <PhotoGrid photos={filteredPosts} />;
};

export default PhotoList;
