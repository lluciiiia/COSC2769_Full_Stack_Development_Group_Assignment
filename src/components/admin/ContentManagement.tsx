import React from "react";
import PostList from "../post/PostList";

const ContentManagement = () => {
  return (
    <div>
      <PostList isAdmin={true} />
    </div>
  );
};

export default ContentManagement;
