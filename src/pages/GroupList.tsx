import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/icons/Loading";
import { fetchGroups } from "../controllers/group";
import { GroupType } from "../interfaces/Group";
import { selectAuthState } from "../features/authSlice";
import CreateGroupModal from "../components/group/CreateGroupModal";
import { sendGroupRequest } from "../controllers/user";
import { selectRequest } from "../features/notificationSlice";

const GroupList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("groups");
  const [activeSubtab, setActiveSubtab] = useState("all");
  const groups = useSelector((state: AppState) => state.groups);
  const { id } = useSelector(selectAuthState);

  // Get all sent group requests
  const sentGroupRequests = useSelector(selectRequest) || [];

  useEffect(() => {
    const loadGroups = async () => {
      try {
        await dispatch(fetchGroups());
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, [dispatch]);

  const handleJoinGroup = async (groupId: string) => {
    // Check if a join request for this group already exists
    const existingGroupRequest = sentGroupRequests.find(
      (request) => request.groupId === groupId,
    );

    if (existingGroupRequest) {
      console.log("Group request already sent");
      return;
    }

    try {
      const response = await dispatch(sendGroupRequest(groupId));
      console.log("Group request response:", response);
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  };
  console.log(groups, "geroups");
  const filteredGroups = () => {
    return groups.filter((group) => {
      // Ensure the group is accepted before checking other conditions
      if (!group.accepted) {
        return false;
      }

      if (activeTab === "groups") {
        if (activeSubtab === "joined") {
          return group.members.includes(id);
        }
        if (activeSubtab === "notJoined") {
          return group.members.includes(id);
        }
        return true; // "all" tab
      }

      if (activeTab === "manage") {
        console.log(group.groupAdmin, "group admin");
        return group.groupAdmin === id;
      }

      return false;
    });
  };
  console.log(groups, "hello group");

  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      {/* Tab Bar */}
      <div className="relative w-full max-w-4xl px-4">
        <div className="flex items-center justify-between border-b">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 font-bold ${
                activeTab === "manage"
                  ? "border-b-2 border-[#FFC123] text-[#FFC123]"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("manage")}
            >
              Manage My Groups
            </button>
            <button
              className={`px-4 py-2 font-bold ${
                activeTab === "groups"
                  ? "border-b-2 border-[#FFC123] text-[#FFC123]"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("groups")}
            >
              Groups
            </button>
          </div>
          <button
            className="cursor-pointer rounded bg-[#FFC123] px-4 py-2 font-bold text-white hover:bg-[#d89e1b] focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            Create Group
          </button>
        </div>
      </div>

      {/* Modal for Creating a Group */}
      {isModalOpen && (
        <CreateGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={id}
        />
      )}

      {/* Tab Content */}
      <div className="mt-6 flex h-full w-[700px] flex-col overflow-y-auto px-4">
        {activeTab === "groups" && !isModalOpen && (
          <>
            <div className="mb-4 flex space-x-4">
              <button
                className={`px-4 py-2 font-bold ${
                  activeSubtab === "all"
                    ? "border-b-2 border-[#FFC123] text-[#FFC123]"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveSubtab("all")}
              >
                All Groups
              </button>
              <button
                className={`px-4 py-2 font-bold ${
                  activeSubtab === "joined"
                    ? "border-b-2 border-[#FFC123] text-[#FFC123]"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveSubtab("joined")}
              >
                Joined Groups
              </button>
              <button
                className={`px-4 py-2 font-bold ${
                  activeSubtab === "notJoined"
                    ? "border-b-2 border-[#FFC123] text-[#FFC123]"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveSubtab("notJoined")}
              >
                Not Joined Groups
              </button>
            </div>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : filteredGroups().length === 0 ? (
              <div className="text-center text-lg font-semibold text-gray-600">
                No groups found
              </div>
            ) : (
              filteredGroups().map((group: GroupType, index: number) => {
                const existingGroupRequest = sentGroupRequests.find(
                  (request) => request.groupId === group._id.toString(),
                );

                return (
                  <div
                    key={group._id}
                    className={`relative flex items-center justify-center py-4 ${
                      index < filteredGroups().length - 1 ? "border-b-2" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={group.imageURL}
                        alt={group.name}
                        className="h-12 w-12 rounded-full border-2 border-black"
                      />
                      <span className="ml-4 text-lg font-bold">
                        {group.name}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                      <span className="text-gray text-sm">
                        {group.members ? group.members.length : 0} members
                      </span>
                      {group.members &&
                        !group.members.some((memberId) => memberId._id === id) &&
                        group.groupAdmin !== id && (
                          <button
                            className={`cursor-pointer rounded px-4 py-2 font-bold text-black focus:outline-none ${
                              existingGroupRequest
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-[#FFC123] hover:bg-[#d89e1b]"
                            }`}
                            onClick={() =>
                              handleJoinGroup(group._id.toString())
                            }
                            disabled={!!existingGroupRequest}
                          >
                            {existingGroupRequest ? "Request Sent" : "Join"}
                          </button>
                        )}

                      <Link to={`/groups/${group._id}/discussion`}>
                        <button className="cursor-pointer rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-500 focus:outline-none">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
        {activeTab === "manage" && !isModalOpen && (
          <>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : filteredGroups().length === 0 ? (
              <div className="text-center text-lg font-semibold text-gray-600">
                No groups found
              </div>
            ) : (
              filteredGroups().map((group: GroupType, index: number) => (
                <div
                  key={group._id}
                  className={`relative flex items-center justify-center py-4 ${
                    index < filteredGroups().length - 1 ? "border-b-2" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={group.imageURL}
                      alt={group.name}
                      className="h-12 w-12 rounded-full border-2 border-black"
                    />
                    <span className="ml-4 text-lg font-bold">{group.name}</span>
                  </div>
                  <div className="ml-auto flex items-center space-x-4">
                    <span className="text-gray text-sm">
                      {group.members ? group.members.length : 0} members
                    </span>
                    <Link to={`/groups/${group._id}/discussion`}>
                      <button className="cursor-pointer rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-500 focus:outline-none">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupList;
