import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Notifications } from "../../interfaces/Notifications";

import {
  acceptFriendRequestNotification,
  fetchNotification,
  removeFriendRequestNotification,
  acceptGroupRequest,
} from "../../controllers/notifications";
import { acceptFriendRequest } from "../../controllers/users";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({
  isOpen,
  notifications,
}: {
  isOpen: boolean;
  notifications: Notifications[];
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAcceptGroupRequest = (
    senderId: string,
    notificationId: string,
  ) => {
    dispatch(acceptGroupRequest({ senderId, notiId: notificationId }));
  };
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
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <RequestItems
              key={noti._id}
              notificationId={noti._id}
              friendId={noti?.senderId?._id}
              name={noti?.senderId?.name}
              imgUrl={noti?.senderId?.profilePictureURL}
              requestType={noti?.type}
              isAccepted={noti?.isAccepted}
              isSeen={noti?.isSeen}
              postId={noti?.postId}
              groupId={noti?.groupId}
              groupAdminId={noti?.groupDetails?.adminId}
              groupImgURL={noti?.groupDetails?.groupImageURL}
              groupName={noti?.groupDetails?.groupName}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleRemoveNotification={handleRemoveNotification}
              handleAcceptGroupRequest={handleAcceptGroupRequest}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        )}
      </div>
    )
  );
};

export default NotificationModal;
const RequestItems = ({
  notificationId,
  friendId,
  name,
  imgUrl,
  requestType,
  isAccepted,
  isSeen,
  postId,
  groupId,
  groupAdminId,
  groupImgURL,
  groupName,
  handleAcceptGroupRequest,
  handleAcceptFriendRequest,
  handleRemoveNotification,
}: {
  notificationId: string;
  friendId: string;
  name: string;
  imgUrl: string;
  requestType: string;
  isAccepted: boolean;
  postId: string;
  groupAdminId: string;
  groupImgURL: string;
  groupName: string;
  isSeen: boolean;
  groupId: string;
  handleAcceptGroupRequest: (senderId: string, notificationId: string) => void;
  handleAcceptFriendRequest: (friendId: string, notificationId: string) => void;
  handleRemoveNotification: (notificationId: string) => void;
}) => {
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(isAccepted);

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
          requestType === "RECEIVE_REACTION" ||
          requestType === "RECEIVE_COMMENT"
            ? navigate(`/posts/${postId}`, { replace: true })
            : requestType === "GROUP_CREATION_APPROVAL"
              ? navigate(`/groups/${groupId}/discussion`)
              : navigate(`/profile/${friendId}`);
        }}
      >
        {requestType === "GROUP_CREATION_APPROVAL" ? (
          <img
            src={groupImgURL}
            alt="Profile"
            className="h-[40px] w-[40px] rounded-full"
          />
        ) : imgUrl ? (
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
          />
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
              <span className="font-bold">{name}</span> wants to join your group
            </span>
          </p>
        ) : requestType === "GROUP_REQUEST_ACCEPTED" ? (
          <p className="text-sm text-gray-700">
            <span>
              <span className="font-bold">{name}</span> has accepted your
              joining group request
            </span>
          </p>
        ) : requestType === "RECEIVE_REACTION" ? (
          <div>
            <p className="text-sm text-gray-700">
              <span>
                <span className="font-bold">{name}</span> reacted to your post
              </span>
            </p>
          </div>
        ) : requestType === "GROUP_CREATION_APPROVAL" ? (
          <p className="text-sm text-gray-700">
            <span>{groupName} is approved</span>
          </p>
        ) : requestType === "RECEIVE_COMMENT" ? (
          <p className="text-sm text-gray-700">
            <span>{name} commented to your post</span>
          </p>
        ) : (
          ""
        )}
      </div>

      {/* Conditionally render the buttons based on the accepted state */}
      {requestType === "FRIEND_REQUEST" && !accepted && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="rounded-lg bg-[#FFC123] px-3 py-1 text-sm font-bold text-white hover:opacity-40"
            onClick={() => {
              handleAcceptFriendRequest(friendId, notificationId);
              setAccepted(true); // Update the local state
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

      {requestType === "GROUP_REQUEST" && !accepted && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="rounded-lg bg-[#FFC123] px-3 py-1 text-sm font-bold text-white hover:opacity-40"
            onClick={() => {
              handleAcceptGroupRequest(friendId, notificationId);
              setAccepted(true); // Update the local state
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
    </div>
  );
};
