import React from "react";
import { getUser, unfriendById } from "../../controllers/user";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";

const ProfileFriendDropDownList = ({ friendId }) => {
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const handleUnFriend = async () => {
    await dispatch(unfriendById({ userId, friendId }));
    dispatch(getUser(userId)); // fetch the user again
  };
  return (
    <div className="relative">
      <div className="absolute right-0 w-36 rounded-md bg-white shadow-xl">
        <>
          <button className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 first:rounded-t-md hover:bg-gray-100">
            View Profile
          </button>
          <button
            onClick={() => {
              handleUnFriend();
            }}
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 last:rounded-b-md hover:bg-gray-100"
          >
            Unfriend
          </button>
        </>
      </div>
    </div>
  );
};
export default ProfileFriendDropDownList;