import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GroupType } from "../interfaces/Group";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { Outlet, NavLink } from "react-router-dom";
import ReturnNavbar from "../components/ReturnNavbar";
import { selectGroupById } from "../features/groupSlice";
import { getPostsByGroup } from "../controllers/posts";
import LoadingSpinner from "../assets/icons/Loading";
import { fetchGroups } from "../controllers/group";
import PostModal from "../components/post/modals/PostModal";
import { selectAuthState } from "../features/authSlice";
import { sendGroupRequest } from "../controllers/user";
import { selectGroupRequest } from "../features/notificationSlice";
import { groupSentRequest } from "../controllers/notification";
import { leaveGroup } from "../controllers/group";
import UpdateGroupModal from "../components/group/EditFullGroupModal"; // Import the EditGroupModal

export default function GroupPage() {
  const groupId = useParams<{ groupId: string }>().groupId || "";
  const dispatch: AppDispatch = useDispatch();
  const [group, setGroup] = useState<GroupType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Group Modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const { id: userId } = useSelector(selectAuthState);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isInGroup, setIsInGroup] = useState(false);

  const selectedGroup = useSelector((state: AppState) =>
    selectGroupById(state, groupId),
  );

  const existingGroupRequest = useSelector((state: AppState) =>
    selectGroupRequest(state, groupId),
  );

  useEffect(() => {
    const loadGroupData = async () => {
      try {
        await dispatch(fetchGroups());
        await dispatch(getPostsByGroup(groupId));
      } catch (error) {
        console.error("Error fetching group data:", error);
        setError("Failed to load group data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadGroupData();
  }, [dispatch, groupId]);

  useEffect(() => {
    if (selectedGroup) {
      setGroup(selectedGroup);
      const memberStatus = selectedGroup.members.some(
        (member) => member._id === userId,
      );
      if (memberStatus) {
        setIsMember(true);
        setIsInGroup(true);
      }

      if (userId === selectedGroup.groupAdmin) {
        setIsAdmin(true);
      }
    }
  }, [selectedGroup, userId]);

  const handleJoinGroup = async () => {
    if (existingGroupRequest) {
      console.log("Group request already sent");
      return;
    }

    try {
      await dispatch(sendGroupRequest(groupId));
      setIsClick(true);
      setIsMember(true);
    } catch (error) {
      console.error("Failed to join group:", error);
      setError("Failed to send group request. Please try again later.");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await dispatch(leaveGroup(groupId));
      setIsMember(false);
      setIsInGroup(false);
    } catch (error) {
      console.error("Failed to leave group:", error);
      setError("Failed to leave group. Please try again later.");
    }
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setIsPostModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPostModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Group not found</p>
      </div>
    );
  }

  return (
    <div>
      <ReturnNavbar />
      <div className="min-h-screen min-w-9 bg-gray-100">
        <header
          className="relative h-[200px] bg-cover bg-center"
          style={{ backgroundImage: `url('${group.backgroundImageURL}')` }}
        >
          <div className="absolute -bottom-12 left-12">
            <img
              src={group.imageURL}
              alt="Group"
              className="h-44 w-44 rounded-full border-4 border-white"
            />
          </div>
        </header>
        <div className="ml-64 mt-4 flex">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-black">{group.name}</h1>
            <p className="text-sm text-gray-600">
              {group.members ? group.members.length : 0} members
            </p>
          </div>
          <div className="ml-auto mr-2 flex space-x-2">
            {isMember || isAdmin ? ( // Show buttons for members or admins
              <>
                <button
                  onClick={handleCreatePost}
                  className="rounded-md bg-[#FFC123] px-2 text-sm text-white shadow-md"
                >
                  Create Post
                </button>
                {isMember && ( // Only show if user is a member
                  <button
                    onClick={handleLeaveGroup}
                    className="rounded-md bg-red-600 px-2 text-sm text-white shadow-md"
                  >
                    Leave Group
                  </button>
                )}
                {isAdmin && ( // Show if user is an admin
                  <button
                    onClick={handleOpenEditModal}
                    className="rounded-md bg-blue-500 px-2 text-sm text-white shadow-md"
                  >
                    Edit Group
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleJoinGroup}
                className={`rounded-md px-4 text-sm text-white shadow-md ${
                  existingGroupRequest || isClick
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-[#FFC123]"
                }`}
                disabled={existingGroupRequest || isClick}
              >
                {isClick ? "Request Sent" : "Join"}
              </button>
            )}
          </div>
        </div>

        <nav className="mt-4 border-b border-gray-300 bg-white">
          <div className="flex justify-around py-2">
            <NavLink
              to="discussion"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 font-bold text-blue-500"
                  : "font-medium text-gray-700 hover:text-blue-500"
              }
            >
              Discussion
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 font-bold text-blue-500"
                  : "font-medium text-gray-700 hover:text-blue-500"
              }
            >
              About
            </NavLink>
            <NavLink
              to="members"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 font-bold text-blue-500"
                  : "font-medium text-gray-700 hover:text-blue-500"
              }
            >
              Members
            </NavLink>
          </div>
        </nav>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
      <PostModal
        isOpen={isPostModalOpen}
        onClose={handleCloseModal}
        userId={userId}
        post={selectedPost}
        groupId={groupId}
      />
      <UpdateGroupModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        group={group} // Passing the group data to the modal
      />
    </div>
  );
}
