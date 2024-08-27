import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";

const ProfileFriendList = () => {
  const user = useSelector((state: AppState) => state.user);
  const { friends } = user;

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

export const FriendListItem = ({ _id, avatar, userName }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="h-14 w-14 rounded-full border-4 border-black shadow-lg"
          src={avatar}
          alt={_id}
        />
        <p className="font-bold">{userName}</p>
      </div>

      <p className="mt-0 text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </p>
    </div>
  );
};
