import React, { useRef, useEffect } from "react";
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { getPosts } from "../../controllers/posts";

function PostList() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: AppState) => {
    return state.posts.posts;
  });

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      dispatch(getPosts());
      firstRender.current = false;
    }
  }, [dispatch]);

  const postList = posts.map((p: PostParams) => <Post key={p._id} {...p} />);
  console.log("posts: ", posts);
  return (
    <div id="postList" className="space-y-6 pt-12">
      {posts.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );
}

export default PostList;
