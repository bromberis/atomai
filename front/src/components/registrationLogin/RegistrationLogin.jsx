import React from "react";
import Registration from "./Registration";
import Login from "./Login";

export default function RegistrationLogin() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Registration />
          </div>
          <div className="col-6">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
