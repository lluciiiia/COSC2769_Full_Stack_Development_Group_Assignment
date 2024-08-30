import React from "react";
import { useSelector } from "react-redux";
import { FriendListItem } from "./FriendListItem";
import { selectCurrentUser, selectViewedUser } from "../../features/userSlice";

const ProfileFriendList = ({ isAuthenticatedUser }) => {
  const currentUser = useSelector(selectCurrentUser);
  const viewedUser = useSelector(selectViewedUser);
  const user = isAuthenticatedUser ? currentUser : viewedUser;

  const friends = user?.friends || [];

  if (friends.length === 0) {
    return <h1>No friend available</h1>;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {friends?.map((friend) => {
        return (
          <FriendListItem
            key={friend._id}
            _id={friend._id}
            avatar={friend.profilePictureURL}
            userName={friend.name}
            isAuthenticatedUser={isAuthenticatedUser}
          />
        );
      })}
    </div>
  );
};
export default ProfileFriendList;
