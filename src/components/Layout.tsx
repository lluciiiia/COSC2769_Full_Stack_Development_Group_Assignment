// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
