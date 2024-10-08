import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Profile from "./pages/Profile.tsx";
import Signup from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import { Provider } from "react-redux";
import Members from "./components/groups/tabs/GroupMember.tsx";
import Discussion from "./components/groups/tabs/GroupDiscussion.tsx";
import About from "./components/groups/tabs/GroupAbout.tsx";
import { store } from "./app/store.ts";
import Admin from "./pages/Admin.tsx";
import Layout from "./components/Layout.tsx";
import GroupList from "./pages/GroupList";
import ProtectedRoute from "./components/protectedRoutes";
import UserSearch from "./pages/UserSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/posts/:postId",
        element: (
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups/:groupId",
        element: (
          <ProtectedRoute>
            <GroupPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "discussion",
            element: <Discussion />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "members",
            element: <Members />,
          },
        ],
      },
      {
        path: "/groups",
        element: (
          <ProtectedRoute>
            <GroupList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:profileId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-search",
        element: <UserSearch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
