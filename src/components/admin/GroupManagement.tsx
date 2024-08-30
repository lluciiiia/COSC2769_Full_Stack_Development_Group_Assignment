import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
// import { fetchGroups, updateGroup } from "../../features/groupSlice";
import { GroupType } from "../../types/group";
import { fetchGroups } from "../../controllers/group";
//import { handleAcceptGroup as acceptGroup } from "../../path/to/your/handleAcceptGroupFunction"; // Replace with the correct path
// import { handleAcceptGroup as acceptGroup } from "../../controllers/group";
export const GroupManagement = () => {
  const [activeTab, setActiveTab] = React.useState("groups");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: AppState) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleViewGroup = (groupId: string) => {
    navigate(`/groups/${groupId}/discussion`);
  };

  const handleAcceptGroupClick = async (groupId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/groups/accepted/${groupId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.ok) {
        console.log(`Group ${groupId} accepted.`);
        dispatch(fetchGroups()); 
      } else {
        console.error("Failed to reject group. Status:", response.status);
      }
    } catch (error) {
      console.error("Error rejecting group:", error);
    }
  };

  const handleRejectGroup = async (groupId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/groups/${groupId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.ok) {
        console.log(`Group ${groupId} rejected.`);
        dispatch(fetchGroups()); // Re-fetch groups after rejection
      } else {
        console.error("Failed to reject group. Status:", response.status);
      }
    } catch (error) {
      console.error("Error rejecting group:", error);
    }
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
          <div>
            {groups
              .filter((group) => group.accepted)
              .map((group) => (
                <div
                  key={group._id}
                  className="mb-4 flex w-full flex-col rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <img
                    src={group.imageURL}
                    alt={group.name}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className="p-4">
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
                      {new Date(group.dateCreated).toLocaleDateString()}
                    </p>
                    <p className="mb-4 text-sm text-gray-600">
                      Description: {group.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleRejectGroup(group._id)}
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
          <div>
            {groups
              .filter((group) => !group.accepted)
              .map((group) => (
                <div
                  key={group._id}
                  className="mb-4 flex w-full flex-col rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <img
                    src={group.imageURL}
                    alt={group.name}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className="p-4">
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
                      {new Date(group.dateCreated).toLocaleDateString()}
                    </p>
                    <p className="mb-4 text-sm text-gray-600">
                      Description: {group.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleRejectGroup(group._id)}
                        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAcceptGroupClick(group._id)}
                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
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
