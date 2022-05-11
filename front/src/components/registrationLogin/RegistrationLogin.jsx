import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import "./style/RegistrationLogin.css";

export default function RegistrationLogin() {
  return (
    <div className="RegistrationLogin-container">
      <div className="">
        <Registration />
      </div>
      <div className="">
        <Login />
      </div>
    </div>
  );
}
