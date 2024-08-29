import React, { useEffect, useRef, useState } from "react";
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../controllers/posts";
import { useParams } from "react-router-dom";
import PostContainer from "./PostContainer";
import LoadingSpinner from "../../assets/icons/Loading";

function PostList() {
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const firstRender = useRef(true);
  const posts = useSelector((state: AppState) => state.posts.posts);
  const postList = posts.map((p: PostParams) => (
    <PostContainer key={p._id} {...p} />
  ));

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getPosts(userId)).finally(() => {
        firstRender.current = false;
        setLoading(false);
      });
    }
  }, [dispatch, userId]);

  return (
    <div id="postList" className="space-y-6 pt-20">
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        postList
      ) : (
        <div className="flex h-[600px] items-center justify-center">
          <h1 className="text-gray-500">No posts available</h1>
        </div>
      )}
    </div>
  );
}

export default PostList;
