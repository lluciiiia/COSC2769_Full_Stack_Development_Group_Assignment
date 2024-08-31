import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppDispatch } from "../../app/store";
import { fetchNotification } from "../../controllers/notification";

const NotificationModal = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const notifications = useSelector((state: AppState) => state.noti.notifications);

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  console.log(notifications);

  return (
    isOpen && (
      <div className="fixed right-16 top-[66px] z-10 flex w-72 flex-col gap-3 shadow-lg">
        {notifications.map((noti) => (
          <RequestFriendNotification
            key={noti.senderId._id}
            name={noti.senderId.name}
            imgUrl={noti.senderId.profilePictureURL}
          />
        ))}
      </div>
    )
  );
};

export default NotificationModal;

export const RequestFriendNotification = ({
  name,
  imgUrl,
}: {
  name: string;
  imgUrl: string;
}) => {
  return (
    <div className="w-full rounded-lg bg-gray-100 p-2">
      <div className="flex items-center gap-2">
        <img
          src={imgUrl}
          alt="Profile"
          className="h-[40px] w-[40px] rounded-full"
        />
        <p className="text-sm text-gray-700">
          <span className="font-bold">{name}</span> has sent you a friend
          request.
        </p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-600">
          Accept
        </button>
        <button className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-black">
          Deny
        </button>
      </div>
    </div>
  );
};
