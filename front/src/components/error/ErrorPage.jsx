import React from "react";
import { NavLink } from "react-router-dom";
import atom from "../../image/logo.svg";

function ErrorPage() {
  return (
    <div className="error">
      <div className="img">
        <img src={atom} alt="atom" className="AtomImg" />
      </div>
      <div className="text">
        <h2>404</h2>
        <p>Puslapis nerastas</p>
        <NavLink to="/" className="errorHome">
          Grįžti į pagrindinį puslapį
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
