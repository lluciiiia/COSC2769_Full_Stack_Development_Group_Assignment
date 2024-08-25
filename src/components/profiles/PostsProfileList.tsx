import React from "react";
import { useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppState } from "../../app/store.ts";
import { useParams } from "react-router-dom";
import Post from "../post/Post.tsx";
import { getPostListById } from "../../features/postsSlice.ts";

const PostsProfileList = () => {
  const { userId } = useParams();

  const filteredPosts: PostParams[] = useSelector(
    (state: AppState): PostParams[] => {
      return getPostListById(state, Number(userId));
    },
  );

  const postList = filteredPosts.map((p: PostParams) => (
    <Post key={p.id} {...p} />
  ));

  return (
    <div id="postList" className="space-y-6 pt-12">
      {postList.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );
};

export default PostsProfileList;
