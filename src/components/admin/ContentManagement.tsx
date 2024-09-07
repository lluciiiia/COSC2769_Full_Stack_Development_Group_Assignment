import React from "react";
import PostList from "../posts/PostList";

const ContentManagement = () => {
  return (
    <div>
      <PostList isAdmin={true} />
    </div>
  );
};

export default ContentManagement;
