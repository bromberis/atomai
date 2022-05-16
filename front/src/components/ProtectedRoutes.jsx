import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "./context/UserContext";

export default function ProtectedRoutes(props) {
  const { userData } = useGlobalUserContext(UserContext);

  console.log(userData.role, props.roleRequired, props);
  console.log(userData.role === props.roleRequired);
  if (props.roleRequired) {
    return userData.role == props.roleRequired ? <Outlet /> : <Navigate to="/" />;
  } else {
    console.log(userData.role);
    return userData.role ? <Outlet /> : <Navigate to="/" />;
  }
}
