import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import Post from "../post/Post";
const ContentManagement = () => {
  const posts = useSelector((state: AppState) => state.posts.posts);
  console.log("posts list", posts);

  const postList = posts.map((p: PostParams) => <Post key={p._id} {...p} />);

  return <div className="grid grid-cols-3 gap-5 p-3">{postList}</div>;
};
export default ContentManagement;
     