import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import { fetchGroups } from "../../controllers/group";
import { groupApprovalNotification } from "../../controllers/notification";
import { acceptGroup, deleteGroup } from "../../controllers/admin";

export const GroupManagement = () => {
  const [activeTab, setActiveTab] = useState("groups");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: AppState) => state.admin.groups);
  console.log("manags: ", groups);

  const handleViewGroup = (groupId: string) => {
    navigate(`/groups/${groupId}/discussion`);
  };

  const handleAcceptGroupClick = async (groupId: string) => {
    dispatch(groupApprovalNotification(groupId));
    dispatch(acceptGroup(groupId)).then(() => {
      dispatch(fetchGroups());
    });
  };

  const handleDeleteGroup = async (groupId: string) => {
    dispatch(deleteGroup(groupId)).then(() => {
      dispatch(fetchGroups());
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => handleTabChange("groups")}
          className={`flex-1 px-4 py-2 text-center ${
            activeTab === "groups" ? "font-bold text-black" : "text-gray-600"
          }`}
          style={{
            backgroundColor: activeTab === "groups" ? "#FFFAE8" : "white",
          }}
        >
          Groups
        </button>
        <button
          onClick={() => handleTabChange("requests")}
          className={`flex-1 px-4 py-2 text-center ${
            activeTab === "requests" ? "font-bold text-black" : "text-gray-600"
          }`}
          style={{
            backgroundColor: activeTab === "requests" ? "#FFFAE8" : "white",
          }}
        >
          Group Requests
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups
              .filter((group) => group.accepted)
              .map((group) => (
                <div
                  key={group._id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <img
                    src={group.imageURL}
                    alt={group.name}
                    className="h-48 w-full object-fill"
                  />
                  <div className="flex flex-grow flex-col p-4">
                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      {group.name}
                    </h2>
                    <p className="mb-1 text-sm text-gray-600">
                      Admin: {group.groupAdmin}
                    </p>
                    <p className="mb-1 text-sm text-gray-600">
                      Visibility: {group.visibility}
                    </p>
                    <p className="mb-2 text-sm text-gray-600">
                      Date Created:{" "}
                      {group.dateCreated
                        ? new Date(group.dateCreated).toLocaleDateString()
                        : "Unknown"}
                    </p>
                    <p className="mb-4 flex-grow text-sm text-gray-600">
                      Description: {group.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleDeleteGroup(group._id)}
                        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewGroup(group._id)}
                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups
              .filter((group) => !group.accepted)
              .map((group) => (
                <div
                  key={group._id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <img
                    src={group.imageURL}
                    alt={group.name}
                    className="object-fit h-48 w-full"
                  />
                  <div className="flex flex-grow flex-col p-4">
                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      {group.name}
                    </h2>
                    <p className="mb-1 text-sm text-gray-600">
                      Admin: {group.groupAdmin}
                    </p>
                    <p className="mb-1 text-sm text-gray-600">
                      Visibility: {group.visibility}
                    </p>
                    <p className="mb-2 text-sm text-gray-600">
                      Date Created:{" "}
                      {group.dateCreated
                        ? new Date(group.dateCreated).toLocaleDateString()
                        : "Unknown"}
                    </p>
                    <p className="mb-4 flex-grow text-sm text-gray-600">
                      Description: {group.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleDeleteGroup(group._id)}
                        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => handleAcceptGroupClick(group._id)}
                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
