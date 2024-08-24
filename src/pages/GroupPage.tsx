
import { useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import { GroupType } from "../types/group";
import { AppState } from "../app/store";
import { Outlet, NavLink } from "react-router-dom";
import ReturnNavbar from "../components/ReturnNavbar";
import { selectGroupById } from "../features/groupSlice";
export default function GroupPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const group: GroupType | undefined = useSelector((state: AppState) =>
    selectGroupById(state, groupId || "")
  );
  return (
    <div>
        {JSON.stringify(group)}


const GroupPage = () => {
  return (
    <div>
      <ReturnNavbar/>
      <div className="min-h-screen bg-gray-100 min-w-9">
      <header
        className="relative h-[250px] bg-cover bg-center"
        style={{ backgroundImage: `url('/fruit_desktop.png')` }}
      >
        <div className="absolute -bottom-12 left-12">
          <img
            src="/cat.png"
            alt="Group"
            className="h-44 w-44 rounded-full border-4 border-white"
          />
        </div>
      </header>
      <div className="ml-64">
            <h1 className="text-xl font-bold text-black">RMIT Vietnam Society</h1>
            <p className="text-gray-600 text-sm">6996 members</p>
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
        {/* This is where the nested route components will be rendered */}
        <Outlet />
      </main>
    </div>
    </div>
   
  );
};

export default GroupPage;
