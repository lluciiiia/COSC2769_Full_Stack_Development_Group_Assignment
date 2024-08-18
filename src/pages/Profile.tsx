import { useSelector } from "react-redux";
import { getUserById } from "../features/userSlice";
import { AppState } from "../app/store";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import { UserType } from "../interfaces/Users";
import TabContent from "../components/profiles/TabContent";
import ProfileHeader from "../components/profiles/ProfileHeader";
import TabNavigation from "../components/profiles/TabNavigation";
import ProfileInformation from "../components/profiles/ProfileInformation";

const Profile = () => {
  const { userId } = useParams();

  const user: UserType | undefined = useSelector((state: AppState) => {
    return getUserById(state, Number(userId));
  });

  //get username
  const name = user?.name;

  const [activeTab, setActiveTab] = useState("Posts");

  //if the user id cannot be found
  if (user === undefined) {
    return <ErrorPage />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <ProfileHeader />

      <div className="mt-16 w-full px-10">
        <ProfileInformation name={name} />

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="mt-1 w-full border-b-2"></div>

      <div className="mt-8 w-full max-w-4xl px-3">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};
export default Profile;
