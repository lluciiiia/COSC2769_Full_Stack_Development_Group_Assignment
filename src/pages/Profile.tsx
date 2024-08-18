import { useSelector } from "react-redux";
import { getUserById, UserType } from "../features/userSlice";
import { AppState } from "../app/store";
import About from "../components/profiles/About";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useState } from "react";

const Profile = () => {
  const { userId } = useParams();

  const user: UserType | undefined = useSelector((state: AppState) => {
    return getUserById(state, Number(userId));
  });

  //get username
  const name = user?.name;

  const [activeTab, setActiveTab] = useState("Posts");

  const renderComponent = (tab: string) => {
    switch (tab) {
      case "Posts":
        return <h1>Post</h1>;
      case "About":
        return <About />;
      case "Friends":
        return <h1>Friends</h1>;
      case "Photos":
        return <h1>Photos</h1>;
      default:
        return null;
    }
  };

  //if the user id cannot be found
  if (user === undefined) {
    return <ErrorPage />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x300')",
        }}
      >
        <div className="absolute -bottom-16 left-10">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>
      <div className="mt-16 w-full px-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {["Posts", "About", "Friends", "Photos"].map((tab) => {
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-black text-opacity-50 ${activeTab === tab ? "text-opacity-100" : ""}`}
              >
                <p
                  className={`${
                    activeTab === tab
                      ? "border-b-2 border-[#FFC123]"
                      : "border-transparent"
                  }`}
                >
                  {tab}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-1 w-full border-b-2"></div>

      <div className="mt-8 w-full max-w-4xl px-3">
        {renderComponent(activeTab)}
      </div>
    </div>
  );
};
export default Profile;
