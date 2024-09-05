import React, { useEffect, useRef, useState } from "react";
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, getPosts } from "../../controllers/posts";
import PostContainer from "./PostContainer";
import LoadingSpinner from "../../assets/icons/Loading";
import { selectAuthState } from "../../features/authSlice";
interface PostListProps {
  isAdmin?: boolean; // Add the isAdmin prop
}

function PostList({ isAdmin = false }: PostListProps) {
  const { id } = useSelector(selectAuthState);
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const firstRender = useRef(true);
  const posts = useSelector((state: AppState) =>
    isAdmin ? state.admin.posts : state.posts.posts,
  );

  useEffect(() => {
    if (!isAdmin && firstRender.current) {
      dispatch(getPosts()).finally(() => {
        firstRender.current = false;
        setLoading(false);
      });
    }
  }, [dispatch, id, isAdmin]);

  // useEffect for admin users (getAllPosts)
  useEffect(() => {
    if (isAdmin && firstRender.current) {
      dispatch(getAllPosts()).finally(() => {
        firstRender.current = false;
        setLoading(false);
      });
    }
  }, [dispatch, id, isAdmin]);

  return (
    <div id="postList" className="space-y-6 pt-20">
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        posts.map((p: PostParams, index: number) => (
          <PostContainer key={`${p._id}-${index}`} {...p} isAdmin={isAdmin} />
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
