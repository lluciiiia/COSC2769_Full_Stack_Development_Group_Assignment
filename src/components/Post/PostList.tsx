import React, { useEffect, useRef, useState } from "react";
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../controllers/posts";
import { useParams } from "react-router-dom";
import PostContainer from "./PostContainer";
import LoadingSpinner from "../../assets/icons/Loading";
import { selectAuthState } from "../../features/authSlice";

function PostList() {
  const { id } = useSelector(selectAuthState);
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const firstRender = useRef(true);
  const posts = useSelector((state: AppState) => state.posts.posts);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getPosts(id)).finally(() => {
        firstRender.current = false;
        setLoading(false);
      });
    }
  }, [dispatch, id]);

  return (
    <div id="postList" className="space-y-6 pt-20">
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        posts.map((p: PostParams, index: number) => (
          <PostContainer key={`${p._id}-${index}`} {...p} />
        ))
      ) : (
        <div className="flex h-[600px] items-center justify-center">
          <h1 className="text-gray-500">No posts available</h1>
        </div>
      )}
    </div>
  );
}

export default PostList;
