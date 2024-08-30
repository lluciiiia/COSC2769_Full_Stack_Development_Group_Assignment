import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { PostParams } from "../../interfaces/Posts";
import PostContainer from "../Post/PostContainer";

const ContentManagement = () => {
  const posts = useSelector((state: AppState) => state.posts.posts);

  const postList = posts.map((p: PostParams, index: number) => (
    <PostContainer key={`${p._id}-${index}`} {...p} />
  ));

  return <div className="grid grid-cols-3 gap-5 p-3">{postList}</div>;
};
export default ContentManagement;
     