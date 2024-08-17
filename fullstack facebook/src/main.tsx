import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Profile from "./pages/Profile.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Signup from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
<<<<<<< HEAD
  
=======
  {
    path: "/signUp",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
>>>>>>> 640b5b9aa903f40985724c6214a48076cdf1be19
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
