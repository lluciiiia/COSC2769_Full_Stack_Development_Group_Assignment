import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import { FriendListItem } from "./FriendListItem";

const ProfileFriendList = () => {
  const user = useSelector((state: AppState) => state.user.currentUser);
  const friends = user.friends || [];

  return (
    <div className="flex w-full flex-col gap-6">
      {friends?.map((friend) => {
        return (
          <FriendListItem
            key={friend._id}
            _id={friend._id}
            avatar={friend.profilePictureURL}
            userName={friend.name}
          />
        );
      })}
    </div>
  );
};
export default ProfileFriendList;
