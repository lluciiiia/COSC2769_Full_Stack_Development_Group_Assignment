import React from "react";
// import { useSelector } from "react-redux";
// import { AppState } from "../../app/store";
// import { PostParams } from "../../interfaces/Posts";
import PostContainer from "../Post/PostContainer";
import PostList from "../Post/PostList";

const ContentManagement = () => {

  return (
   
      <div >
        <PostList isAdmin = {true}/>
      </div>
  );
};

export default ContentManagement;
