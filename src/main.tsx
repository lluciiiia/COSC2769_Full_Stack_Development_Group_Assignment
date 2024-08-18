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
        element: <GroupPage/>
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/signUp",
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
