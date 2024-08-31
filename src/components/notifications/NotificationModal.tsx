import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

import {
  acceptFriendRequestNotification,
  denyFriendRequestNotification,
  fetchNotification,
} from "../../controllers/notification";
import { selectNotifications } from "../../features/notificationSlice";
import { Notifications } from "../../interfaces/notification";
import { acceptFriendRequest } from "../../controllers/user";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const notifications: Notifications[] = useSelector(selectNotifications);

  const handleAcceptFriendRequest = (friendId, notificationId) => {
    dispatch(acceptFriendRequest(friendId));
    dispatch(acceptFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification());
    });
  };
  const handleDenyFriendRequest = (notificationId) => {
    dispatch(denyFriendRequestNotification(notificationId)).then(() => {
      dispatch(fetchNotification());
    });
  };

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  return (
    isOpen && (
      <div className="fixed right-0 top-[66px] z-10 flex w-1/5 flex-col gap-3 shadow-lg">
        {notifications.map(
          (noti) =>
            // only show the noti that hasn't accepted
            !noti.isAccepted && (
              <RequestItems
                key={noti.senderId._id}
                notificationId={noti._id}
                friendId={noti.senderId._id}
                name={noti.senderId.name}
                imgUrl={noti.senderId.profilePictureURL}
                requestType={noti.type}
                handleAcceptFriendRequest={handleAcceptFriendRequest}
                handleDenyFriendRequest={handleDenyFriendRequest}
              />
            ),
        )}
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
  handleAcceptFriendRequest,
  handleDenyFriendRequest,
}: {
  notificationId: string;
  friendId: string;
  name: string;
  imgUrl: string;
  requestType: string;
  handleAcceptFriendRequest: (param1: string, param2: string) => void;
  handleDenyFriendRequest: (param1: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full rounded-lg bg-gray-100 p-2">
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
            <span className="font-bold">{name}</span> has sent you a friend
            request.
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            <span className="font-bold">{name}</span> want to join your group
          </p>
        )}
      </div>
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
            handleDenyFriendRequest(notificationId);
          }}
        >
          Deny
        </button>
      </div>
    </div>
  );
};
