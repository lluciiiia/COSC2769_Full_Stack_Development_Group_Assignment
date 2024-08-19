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
import Members from "./components/group/member.tsx";
import Discussion from "./components/group/discussion.tsx";
import About from "./components/group/about.tsx";
import { store } from "./app/store.ts";
// import Layout from "./components/Layout.tsx";  

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />,  //Setting global navbar for the page
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <PostDetail />,
      },
      {
        path: "/groupPage/:groupId",
        element: <GroupPage/>,
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
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
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
