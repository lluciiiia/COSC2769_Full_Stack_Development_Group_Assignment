import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthState, fetchSess } from "../features/authSlice";
import { AppDispatch } from "../app/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSess());
      setLoading(false);
    };

    if (!auth.isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, auth.isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !auth.isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
