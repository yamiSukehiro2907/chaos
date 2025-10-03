import type { RootState } from "../redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  const { userData } = useSelector((state: RootState) => state.user);
  
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
