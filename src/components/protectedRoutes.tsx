import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthState, fetchSess } from "../features/authSlice";
import { AppDispatch } from "../app/store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch session on component mount
    const fetchData = async () => {
      await dispatch(fetchSess());
      setLoading(false); // Set loading to false once fetchSess is complete
    };

    if (!auth.isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, auth.isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while the session is being fetched
  }

  // Check Redux state for authentication
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
