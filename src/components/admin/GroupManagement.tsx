//http://localhost:8080/api/groups

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GroupType } from "../../types/group"; // Adjust the path as needed

export const GroupManagement = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [activeTab, setActiveTab] = useState("groups");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/groups"); // Replace with your actual API endpoint
        const data: GroupType[] = await response.json();
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
            backgroundColor: activeTab === "groups" ? "#FFFAE8" : "white", // Custom color for active tab, white for inactive
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
            backgroundColor: activeTab === "requests" ? "#FFFAE8" : "white", // Custom color for active tab, white for inactive
          }}
        >
          Group Requests
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups.map((group) => (
              <div
                key={group._id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={group.imageURL}
                  alt={group.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {group.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Admin: {group.groupAdmin}
                  </p>
                  <p className="text-sm text-gray-600">
                    Visibility: {group.visibility}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date Created:{" "}
                    {new Date(group.dateCreated).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-around border-t border-gray-200 p-4">
                  <button
                    onClick={() => {}}
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Delete Group
                  </button>
                  <button
                    onClick={() => handleViewGroup(group._id)}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    View Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "requests" && (
          <div>
            {/* Placeholder content for Group Requests tab */}
            <p className="text-gray-600">Group Requests content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupManagement;
