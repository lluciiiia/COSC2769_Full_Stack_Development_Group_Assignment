import React, { useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticatedUser) {
      dispatch(getPostsByCreatorId(userId)).finally(() => {
        setLoading(false);
      });
    } else {
      dispatch(getViewedUserPosts(userId)).finally(() => {
        setLoading(false);
      });
    }
    firstRender.current = false;
  }, [dispatch, userId, isAuthenticatedUser]);

  switch (activeTab) {
    case "Posts":
      return (
        <PostsProfileList
          isAuthenticatedUser={isAuthenticatedUser}
          loading={loading}
        />
      );
    case "About":
      return <About isAuthenticatedUser={isAuthenticatedUser} />;
    case "Friends":
      return <ProfileFriendList isAuthenticatedUser={isAuthenticatedUser} />;
    case "Photos":
      return (
        <PhotoList
          isAuthenticatedUser={isAuthenticatedUser}
          loading={loading}
        />
      );
    default:
      return null;
  }
};

export default TabContent;
