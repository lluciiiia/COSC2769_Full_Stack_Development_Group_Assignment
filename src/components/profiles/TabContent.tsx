import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import About from "./About";
import PhotoList from "./PhotoList";
import PostsList from "./PostsProfileList";
import { useEffect, useRef } from "react";
import { getPosts } from "../../controllers/posts";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(getPosts());
      firstRender.current = false;
    }
  }, []);

  switch (activeTab) {
    case "Posts":
      return <PostsList />;
    case "About":
      return <About />;
    case "Friends":
      return <h1>Friends</h1>;
    case "Photos":
      return <PhotoList />;
    default:
      return null;
  }
};

export default TabContent;
