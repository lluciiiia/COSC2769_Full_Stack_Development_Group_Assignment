import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/icons/Loading";
import { fetchGroups } from "../controllers/group";
import { GroupType } from "../interfaces/Group";

const GroupList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const groups = useSelector((state: AppState) => state.groups);

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
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-12 text-center text-2xl font-bold">
        Join groups to share your interests with!
      </h1>
      <div className="flex w-full max-w-xl flex-col">
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
              <div className="ml-auto flex space-x-4">
                <button className="cursor-pointer rounded bg-[#FFC123] px-4 py-2 font-bold text-black hover:bg-[#d89e1b] focus:outline-none">
                  Join
                </button>
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
    </div>
  );
};

export default GroupList;
