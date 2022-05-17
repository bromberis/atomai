import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "./context/UserContext";

export default function ProtectedRoutes(props) {
  let { userData } = useGlobalUserContext(UserContext);

  if (userData.hasOwnProperty("email")) {
    if (props.roleRequired) {
      return userData.role == props.roleRequired ? <Outlet /> : <Navigate to="/" />;
    } else if (userData.hasOwnProperty("role")) {
      return userData.role ? <Outlet /> : <Navigate to="/" />;
    } else {
      setTimeout(() => {
        return <Navigate to="/" />;
      }, 1000);
    }
  }
}
