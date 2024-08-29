// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar.tsx";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
