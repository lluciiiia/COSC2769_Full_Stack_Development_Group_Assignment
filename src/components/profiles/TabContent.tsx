import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import About from "./About";
import PhotoList from "./PhotoList";
import PostsProfileList from "./PostsProfileList";
import { useEffect, useRef } from "react";
import { getPosts, getPostsByCreatorId } from "../../controllers/posts";

const TabContent = ({
  activeTab,
  userId,
}: {
  activeTab: string;
  userId: string | undefined;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getPostsByCreatorId(userId));
      firstRender.current = false;
    }
  }, []);

  switch (activeTab) {
    case "Posts":
      return <PostsProfileList />;
    case "About":
      return <About />;
    case "Friends":
      return <h1>Friends</h1>;
    case "Photos":
      return <h1>Friends</h1>;

    // return <PhotoList />;
    default:
      return null;
  }
};

export default TabContent;
