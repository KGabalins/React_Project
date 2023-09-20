import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
