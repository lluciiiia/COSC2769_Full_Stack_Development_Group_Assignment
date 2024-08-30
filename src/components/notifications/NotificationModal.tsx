import React, { useState } from "react";

const NotificationModal = ({ isOpen }) => {
  const [userList, setUserList] = useState([
    {
      name: "John Doe",
      profilePictureURL: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Lionel Messi",
      profilePictureURL: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Cristiano Ronaldo",
      profilePictureURL: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ]);
  return (
    isOpen && (
      <div className="fixed right-16 top-[66px] z-10 flex w-72 flex-col gap-3 shadow-lg">
        {userList.map((user) => {
          return (
            <RequestFriendNotification
              name={user.name}
              imgUrl={user.profilePictureURL}
            />
          );
        })}
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