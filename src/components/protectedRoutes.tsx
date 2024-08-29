import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {selectAuthState} from '../features/authSlice';
import Cookies from 'js-cookie';
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useSelector(selectAuthState);
  console.log(Cookies.get('isAuthenticated') + "cookies added")
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
