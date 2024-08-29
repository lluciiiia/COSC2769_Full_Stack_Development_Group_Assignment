import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GroupType } from "../../types/group"; // Adjust the path as needed

export const GroupManagement = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [activeTab, setActiveTab] = useState("groups");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/groups");
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data: GroupType[] = await response.json();
        // Log the fetched data
        console.log("Fetched Groups Data:", data);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleViewGroup = (groupId: string) => {
    navigate(`/groups/${groupId}/discussion`);
  };

  const handleAcceptGroup = async (groupId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/groups/${groupId}/accept`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        const updatedGroup = await response.json();
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group._id === updatedGroup._id ? updatedGroup : group
          )
        );
      } else {
        console.error("Failed to accept group. Status:", response.status);
      }
    } catch (error) {
      console.error("Error accepting group:", error);
    }
  };
  

  const handleRejectGroup = async (groupId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/groups/${groupId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // Log the result after rejection
        console.log(`Group ${groupId} rejected.`);
        setGroups((prevGroups) =>
          prevGroups.filter((group) => group._id !== groupId)
        );
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
              .filter((group) => group.Accepted === "Accepted")
              .map((group) => {
                // Log each group being rendered in the "Accepted" tab
                console.log("Rendering Accepted Group:", group);
                return (
                  <div
                    key={group._id}
                    className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg mb-4"
                  >
                    <img
                      src={group.imageURL}
                      alt={group.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {group.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-1">
                        Admin: {group.groupAdmin}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Visibility: {group.visibility}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Date Created:{" "}
                        {new Date(group.dateCreated).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
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
                );
              })}
          </div>
        )}

        {activeTab === "requests" && (
          <div>
            {groups
              .filter((group) => group.Accepted !== "Accepted")
              .map((group) => {
                // Log each group being rendered in the "Requests" tab
                console.log("Rendering Request Group:", group);
                return (
                  <div
                    key={group._id}
                    className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg mb-4"
                  >
                    <img
                      src={group.imageURL}
                      alt={group.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {group.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-1">
                        Admin: {group.groupAdmin}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Visibility: {group.visibility}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Date Created:{" "}
                        {new Date(group.dateCreated).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
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
                          onClick={() => handleAcceptGroup(group._id)}
                          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
