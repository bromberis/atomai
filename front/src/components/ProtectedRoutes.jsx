import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "./context/UserContext";

export default function ProtectedRoutes(props) {
  let navigate = useNavigate();
  let { userData } = useGlobalUserContext(UserContext);
  //if (userData.role === undefined) return "... LOADING ...";
  console.log(userData.role, props.roleRequired, props);
  console.log(userData.role === props.roleRequired);
  // if (userData.role === undefined) {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 1000);
  //   return "";
  // }

  function test() {}

  if (userData.hasOwnProperty("email")) {
    if (props.roleRequired) {
      return userData.role == props.roleRequired ? <Outlet /> : <Navigate to="/" />;
    } else if (userData.hasOwnProperty("role")) {
      console.log(userData.role);
      return userData.role ? <Outlet /> : <Navigate to="/" />;
    } else {
      return <Navigate to="/" />;
    }
  }
}
