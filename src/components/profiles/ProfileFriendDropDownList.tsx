import React from "react";
import { getUser, unfriendById } from "../../controllers/user";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const ProfileFriendDropDownList = ({ friendId, isAuthenticatedUser }) => {
  const { id } = useSelector(selectAuthState);
  const dispatch: AppDispatch = useDispatch();

  const handleUnFriend = async () => {
    await dispatch(unfriendById({ userId: id, friendId }));
    dispatch(getUser(id)); // fetch the user again
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
    window.location.reload();
  };

  return (
    <div className="relative">
      <div className="absolute right-0 w-36 rounded-md bg-white shadow-xl">
        <>
          <button
            className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 first:rounded-t-md hover:bg-gray-100"
            onClick={() => {
              handleClick(friendId);
            }}
          >
            View Profile
          </button>
          {isAuthenticatedUser && (
            <button
              onClick={() => {
                handleUnFriend();
              }}
              className="block w-full border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-700 last:rounded-b-md hover:bg-gray-100"
            >
              Unfriend
            </button>
          )}
        </>
      </div>
    </div>
  );
};
export default ProfileFriendDropDownList;
