import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { GroupManagement } from "../components/admin/GroupManagement";
import UserManagement from "../components/admin/UserManagement";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../controllers/users";
import { AppDispatch } from "../app/store";
import { getAllPosts } from "../controllers/posts";
import ContentManagement from "../components/admin/ContentManagement";
import { fetchGroups } from "../controllers/groups";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<string>("Group");
  const dispatch = useDispatch<AppDispatch>();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(fetchGroups());
      dispatch(getAllUsers());
      dispatch(getAllPosts());
      firstRender.current = false;
    }
  }, []);

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
      return <GroupManagement />;
    case "Users":
      return <UserManagement />;
    case "Content":
      return <ContentManagement />;
    default:
      return null;
  }
};
