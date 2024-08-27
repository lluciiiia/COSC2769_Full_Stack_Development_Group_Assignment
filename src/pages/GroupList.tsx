import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../features/groupSlice";
import { AppState, AppDispatch } from "../app/store";
import { GroupType } from "../types/group";
import { Link } from "react-router-dom";

const GroupList = () => {
  const dispatch: AppDispatch = useDispatch();
  const groups = useSelector((state: AppState) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="space-y-4 p-4 max-w-xl w-full">
        {groups && groups.length === 0 && (
          <div className="text-center text-lg font-semibold text-gray-600">
            No groups found
          </div>
        )}

        {groups && groups.length > 0 && (
          groups.map((group: GroupType) => (
            <div key={group._id} className="flex mt-20 items-center border-black border-t-2 pb-4 justify-between relative">
              <div className="flex pt-5 items-center">
                <img
                  src={group.imageURL}
                  alt={group.name}
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
                <span className="ml-4 text-lg font-bold">{group.name}</span>
              </div>
              <div className="ml-auto flex space-x-4">
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Join
                </button>
                <Link to={`/groups/${group._id}/discussion`}>
                  <button
                    className="text-white bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded focus:outline-none"
                  >
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
