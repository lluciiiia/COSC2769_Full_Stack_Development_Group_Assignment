import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Notifications } from "../../interfaces/notification";

import {
  acceptFriendRequestNotification,
  fetchNotification,
  removeFriendRequestNotification,
} from "../../controllers/notification";
import { acceptFriendRequest } from "../../controllers/user";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({
  isOpen,
  notifications,
}: {
  isOpen: boolean;
  notifications: Notifications[];
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAcceptFriendRequest = (friendId, notificationId) => {
    dispatch(acceptFriendRequest(friendId));
    dispatch(acceptFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification());
    });
  };

  const handleRemoveNotification = (notificationId) => {
    dispatch(removeFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification());
    });
  };

  return (
    isOpen && (
      <div className="fixed right-0 top-[66px] z-10 flex w-full max-w-sm flex-col gap-3 shadow-lg">
        {notifications.map((noti) => (
          <RequestItems
            key={noti._id}
            notificationId={noti._id}
            friendId={noti.senderId._id}
            name={noti.senderId.name}
            imgUrl={noti.senderId.profilePictureURL}
            requestType={noti.type}
            isAccepted={noti.isAccepted}
            isSeen={noti.isSeen}
            handleAcceptFriendRequest={handleAcceptFriendRequest}
            handleRemoveNotification={handleRemoveNotification}
          />
        ))}
      </div>
    )
  );
};

export default NotificationModal;

export const RequestItems = ({
  notificationId,
  friendId,
  name,
  imgUrl,
  requestType,
  isAccepted,
  isSeen,
  handleAcceptFriendRequest,
  handleRemoveNotification,
}: {
  notificationId: string;
  friendId: string;
  name: string;
  imgUrl: string;
  requestType: string;
  isAccepted: boolean;
  isSeen: boolean;
  handleAcceptFriendRequest: (param1: string, param2: string) => void;
  handleRemoveNotification: (param1: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full rounded-lg bg-gray-100 p-2">
      <button
        className="absolute right-2 top-0 text-gray-500 hover:text-black"
        onClick={() => handleRemoveNotification(notificationId)}
      >
        &times;
      </button>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => {
          navigate(`/profile/${friendId}`);
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Profile"
            className="h-[40px] w-[40px] rounded-full"
          />
        ) : (
          <img
            src="/src/assets/icons/default-profile.png"
            alt="Profile"
            className="h-[40px] w-[40px] rounded-full"
          ></img>
        )}
        {requestType === "FRIEND_REQUEST" ? (
          <p className="text-sm text-gray-700">
            <span>
              <span className="font-bold">{name}</span> has sent you a friend
              request.
            </span>
          </p>
        ) : requestType === "FRIEND_REQUEST_ACCEPTED" ? (
          <p className="text-sm text-gray-700">
            <span>
              <span className="font-bold">{name}</span> has accepted your friend
              request
            </span>
          </p>
        ) : requestType === "GROUP_REQUEST" ? (
          <p className="text-sm text-gray-700">
            <span>
              <span className="font-bold">{name}</span> want to join your group
            </span>
          </p>
        ) : (
          ""
        )}
      </div>

      {requestType === "FRIEND_REQUEST" && !isAccepted && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="rounded-lg bg-[#FFC123] px-3 py-1 text-sm font-bold text-white hover:opacity-40"
            onClick={() => {
              handleAcceptFriendRequest(friendId, notificationId);
            }}
          >
            Accept
          </button>
          <button
            className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-black hover:opacity-20"
            onClick={() => {
              handleRemoveNotification(notificationId);
            }}
          >
            Deny
          </button>
        </div>
      )}

      {requestType === "GROUP_REQUEST" && !isAccepted && (
        <button>GROUP BUTTON</button>
      )}
    </div>
  );
};
