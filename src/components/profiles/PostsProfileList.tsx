import React from "react";
import { useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppState } from "../../app/store.ts";
import PostContainer from "../posts/PostContainer.tsx";

const PostsProfileList = ({ isAuthenticatedUser }) => {
  const creatorPosts = useSelector(
    (state: AppState) => state.posts.creatorPost,
  );

  const viewedPosts = useSelector((state: AppState) => state.posts.viewedPosts);

  const posts: PostParams[] = isAuthenticatedUser ? creatorPosts : viewedPosts;

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
