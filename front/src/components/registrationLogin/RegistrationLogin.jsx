import React, { useEffect } from "react";
import Registration from "./Registration";
import Login from "./Login";
import "./style/RegistrationLogin.css";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationLogin() {
  let navigate = useNavigate();
  const { userData } = useGlobalUserContext(UserContext);
  useEffect(() => {
    if (userData != undefined && userData.hasOwnProperty("email")) {
      navigate("/incexp");
    }
  });

  return (
    <div className="RegistrationLogin-container">
      <div className="">
        <Login />
      </div>
      <div className="">
        <Registration />
      </div>
    </div>
  );
}
