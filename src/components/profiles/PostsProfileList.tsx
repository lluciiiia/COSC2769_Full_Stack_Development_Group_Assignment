import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppDispatch, AppState } from "../../app/store.ts";
import { useParams } from "react-router-dom";
import Post from "../post/Post.tsx";
import { getPostsByCreatorId } from "../../controllers/posts.tsx";

const PostsProfileList = () => {
  const posts = useSelector((state: AppState) => state.posts.creatorPost);
  console.log(posts);
  const postList = posts.map((p: PostParams) => <Post key={p._id} {...p} />);

  return (
    <div id="postList" className="space-y-6 pt-12">
      {postList.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );
};

export default PostsProfileList;
