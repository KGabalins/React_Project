import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const GuestRoute = () => {
  const { currentUser } = useContext(UserContext);

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
