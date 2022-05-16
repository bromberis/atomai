import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "./context/UserContext";

export default function PrivateRoutes() {
  const { userData } = useGlobalUserContext(UserContext);
  console.log(userData.role);
  return userData.role === "user" ? <Outlet /> : <Navigate to="/" />;
}
