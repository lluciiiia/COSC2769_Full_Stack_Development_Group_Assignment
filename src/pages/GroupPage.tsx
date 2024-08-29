import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GroupType } from "../interfaces/Group";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "../app/store";
import { Outlet, NavLink } from "react-router-dom";
import ReturnNavbar from "../components/ReturnNavbar";
import { selectGroupById, fetchGroups } from "../features/groupSlice";
import { getPostsByGroup } from "../controllers/posts";
export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [group, setGroup] = useState<GroupType | null>(null); // Allow group to be null initially

  const selectedGroup = useSelector((state: AppState) =>
    selectGroupById(state, groupId || ""),
  );

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(getPostsByGroup(groupId));
    
  }, [dispatch]);

  useEffect(() => {
    setGroup(selectedGroup || null); 
  }, [selectedGroup]);

  if (!group) {
    return <div>Group not found</div>; 
  }

  return (
    <div>
      <ReturnNavbar />
      <div className="min-h-screen min-w-9 bg-gray-100">
        <header
          className="relative h-[250px] bg-cover bg-center"
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
        <div className="ml-64">
          <h1 className="text-xl font-bold text-black">{group.name}</h1>
          <p className="text-sm text-gray-600">{group.members ? group.members.length : 0} members</p>
        </div>
        <div>
          <div className="mt-16 px-4">
            <div className="flex items-start">
              <div className="ml-auto flex space-x-2">
                <button className="rounded-md bg-red-600 px-4 py-2 text-white shadow-md">
                  Leave Group
                </button>
                <button className="rounded-md border border-gray-400 bg-white px-4 py-2 text-black shadow-md">
                  Report
                </button>
              </div>
            </div>
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
    </div>
  );
}
