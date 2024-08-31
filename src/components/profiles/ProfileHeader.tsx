import React from "react";
import DefaultProfile from "../../assets/icons/DefaultProfile";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../features/authSlice";
import {
  acceptFriendRequest,
  getViewedUser,
  sendFriendRequest,
  unfriendById,
} from "../../controllers/user";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import {
  selectNotifications,
  selectSentFriendRequests,
} from "../../features/notificationSlice";
import {
  acceptFriendRequestNotification,
  denyFriendRequestNotification,
  fetchNotification,
  fetchSentFriendRequests,
} from "../../controllers/notification";
const ProfileHeader = ({
  name,
  bio,
  avatar,
  friends,
  handleEditProfile,
  isAuthenticatedUser,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useSelector(selectAuthState);
  const { profileId } = useParams();

  const friendId = isAuthenticatedUser ? "" : profileId;
  const isFriend = friends?.some((f) => f._id == id);

  const sentFriendRequestsList = useSelector(selectSentFriendRequests);
  const receivedFriendRequestList = useSelector(selectNotifications);

  const isSendingRequest = sentFriendRequestsList?.some(
    (request) =>
      request.receiverId === friendId &&
      !request.isAccepted &&
      request.type === "FRIEND_REQUEST",
  );

  const isIncomingFriendRequest = receivedFriendRequestList?.some(
    (request) =>
      request.senderId._id === friendId &&
      !request.isAccepted &&
      request.type === "FRIEND_REQUEST",
  );

  const incomingFriendRequest = receivedFriendRequestList?.find(
    (request) =>
      request.senderId._id === friendId &&
      !request.isAccepted &&
      request.type === "FRIEND_REQUEST",
  );
  const notificationId = incomingFriendRequest?._id;

  const handleSendFriendRequest = (friendId) => {
    dispatch(sendFriendRequest(friendId)).then(() => {
      dispatch(fetchSentFriendRequests());
    });
  };

  const handleAcceptFriendRequest = (notificationId) => {
    dispatch(acceptFriendRequest(friendId));
    dispatch(acceptFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification()).then(() => {
        dispatch(getViewedUser(profileId));
      });
    });
  };

  const handleDenyFriendRequest = (notificationId) => {
    dispatch(denyFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification());
    });
  };

  const handleUnfriend = (friendId) => {
    dispatch(unfriendById(friendId)).then(() => {
      dispatch(getViewedUser(friendId));
    });
  };

  return (
    <div className="relative h-64 w-full bg-gray-200 bg-cover bg-center">
      <div className="absolute -bottom-16 left-10">
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg transition-opacity duration-200 hover:opacity-80"
          />
        ) : (
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg">
            <DefaultProfile />
          </div>
        )}
        {isAuthenticatedUser && (
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100">
            <span className="text-white">Edit Image</span>
          </div>
        )}
      </div>
      <div className="absolute -bottom-14 left-44">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm">{bio}</p>
      </div>
      {isAuthenticatedUser ? (
        <button
          className="absolute -bottom-14 right-5 mr-3 rounded-md border border-black bg-white px-4 py-2 text-gray-800 shadow hover:bg-gray-100"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      ) : isFriend ? (
        <button
          className="absolute -bottom-14 right-5 mr-3 rounded-md border bg-[#FFC123] px-4 py-2 text-gray-800 shadow hover:opacity-20"
          onClick={() => {
            handleUnfriend(profileId);
          }}
        >
          Unfriend
        </button>
      ) : isSendingRequest ? (
        <button className="absolute -bottom-14 right-5 mr-3 cursor-default rounded-md border bg-gray-200 px-4 py-2 text-gray-800 shadow">
          Request Sent
        </button>
      ) : isIncomingFriendRequest ? (
        <div className="absolute -bottom-14 right-5 mr-3 flex space-x-2">
          <button
            className="rounded-md border bg-[#FFC123] px-4 py-2 text-gray-800 shadow hover:opacity-40"
            onClick={() => {
              handleAcceptFriendRequest(notificationId);
            }}
          >
            Accept
          </button>
          <button
            className="rounded-md border bg-gray-100 px-4 py-2 text-gray-800 shadow hover:opacity-40"
            onClick={() => {
              handleDenyFriendRequest(notificationId);
            }}
          >
            Deny
          </button>
        </div>
      ) : (
        <button
          className="absolute -bottom-14 right-5 mr-3 rounded-md border bg-[#FFC123] px-4 py-2 text-gray-800 shadow hover:opacity-20"
          onClick={() => {
            handleSendFriendRequest(friendId);
          }}
        >
          Add Friend
        </button>
      )}
    </div>
  );
};
export default ProfileHeader;
