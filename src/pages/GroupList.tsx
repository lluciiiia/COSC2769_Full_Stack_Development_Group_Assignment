import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { GroupType } from "../types/group";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/icons/Loading";
import { fetchGroups } from "../controllers/group";

const GroupList = () => {
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
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xl space-y-4 p-4">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : groups && groups.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            No groups found
          </div>
        ) : (
          groups.map((group: GroupType) => (
            <div
              key={group._id}
              className="relative mt-20 flex items-center justify-between border-t-2 border-black pb-4"
            >
              <div className="flex items-center pt-5">
                <img
                  src={group.imageURL}
                  alt={group.name}
                  className="h-12 w-12 rounded-full border-2 border-black"
                />
                <span className="ml-4 text-lg font-bold">{group.name}</span>
              </div>
              <div className="ml-auto flex space-x-4">
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                  Join
                </button>
                <Link to={`/groups/${group._id}/discussion`}>
                  <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none">
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
