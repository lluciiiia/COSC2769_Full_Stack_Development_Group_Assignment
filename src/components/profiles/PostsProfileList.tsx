import React from "react";
import { useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppState } from "../../app/store.ts";
import PostContainer from "../post/PostContainer.tsx";

const PostsProfileList = () => {
  const posts = useSelector((state: AppState) => state.posts.creatorPost);

  const postList = posts.map((p: PostParams) => (
    <PostContainer key={p._id} {...p} />
  ));

  return (
    <div id="postList" className="space-y-6 pt-12">
      {postList.length > 0 ? postList : <h1>No post available</h1>}
    </div>
  );
};

export default PostsProfileList;
