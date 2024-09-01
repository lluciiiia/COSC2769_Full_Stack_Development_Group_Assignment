import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/icons/Loading";
import { fetchGroups } from "../controllers/group";
import { GroupType } from "../interfaces/Group";
import { selectAuthState } from "../features/authSlice";
import CreateGroupModal from "../components/group/CreateGroupModal";

const GroupList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const groups = useSelector((state: AppState) => state.groups);
  console.log(groups);
  const { id } = useSelector(selectAuthState);

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

  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      {/* Create Group Button */}
      <div className="relative w-full max-w-4xl px-4">
        <h1 className="text-center text-2xl font-bold">
          Join groups to share your interests with!
        </h1>
        <div className="absolute right-0 top-0">
          <button
            className="cursor-pointer rounded bg-[#FFC123] px-4 py-2 font-bold text-white hover:bg-[#d89e1b] focus:outline-none"
            onClick={() => setIsModalOpen(true)} // Open modal on click
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
          //onCreate={handleCreateGroup}
        />
      )}

      {/* Group List */}
      {!isModalOpen && (
        <div className="flex h-[550px] w-[700px] flex-col overflow-y-auto px-4 mt-6">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : groups && groups.length === 0 ? (
            <div className="text-center text-lg font-semibold text-gray-600">
              No groups found
            </div>
          ) : (
            groups.map((group: GroupType, index: number) => (
              <div
                key={group._id}
                className={`relative flex items-center justify-center py-4 ${
                  index < groups.length - 1 ? "border-b-2" : ""
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
                  {!group.members.includes(id) && (
                    <button className="cursor-pointer rounded bg-[#FFC123] px-4 py-2 font-bold text-black hover:bg-[#d89e1b] focus:outline-none">
                      Join
                    </button>
                  )}
                  <Link to={`/groups/${group._id}/discussion`}>
                    <button className="cursor-pointer rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-500 focus:outline-none">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GroupList;
