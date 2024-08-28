import React from "react";
import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { GroupManagement } from "../components/admin/GroupManagement";

import PostManagement from "../components/admin/PostManagement";
import UserManagement from "../components/admin/UserManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<string>("Group");

  return (
    <div>
      <AdminNavbar setActiveTab={setActiveTab} />
      <div className="pt-16">{AdminTabContent(activeTab)}</div>
    </div>
  );
};
export default Admin;

const AdminTabContent = (activeTab: string) => {
  switch (activeTab) {
    case "Group":
      return  <GroupManagement/>;
    case "Users":
      return < UserManagement/>;
    case "Content":
      return <PostManagement/>;
    default:
      return null;
  }
};
