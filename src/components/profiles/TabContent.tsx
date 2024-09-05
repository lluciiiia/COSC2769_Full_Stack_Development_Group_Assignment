import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import About from "./About";
import PhotoList from "./PhotoList";
import PostsProfileList from "./PostsProfileList";
import { useEffect, useRef } from "react";
import {
  getPostsByCreatorId,
  getViewedUserPosts,
} from "../../controllers/posts";
import ProfileFriendList from "./ProfileFriendList";

const TabContent = ({
  activeTab,
  userId,
  isAuthenticatedUser,
}: {
  activeTab: string;
  userId: string | undefined;
  isAuthenticatedUser;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (isAuthenticatedUser) {
      dispatch(getPostsByCreatorId(userId));
    } else {
      dispatch(getViewedUserPosts(userId));
    }
    firstRender.current = false;
  }, [dispatch, userId, isAuthenticatedUser]);

  switch (activeTab) {
    case "Posts":
      return <PostsProfileList isAuthenticatedUser={isAuthenticatedUser}/>;
    case "About":
      return <About isAuthenticatedUser={isAuthenticatedUser} />;
    case "Friends":
      return <ProfileFriendList isAuthenticatedUser={isAuthenticatedUser} />;
    case "Photos":
      return <PhotoList />;
    default:
      return null;
  }
};

export default TabContent;
