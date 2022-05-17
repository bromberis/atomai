import React, { useState } from "react";
import Users from "./Users";
export default function Admin() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        <button onClick={() => setDisplay("users")}>Vartotojai</button>
        <button onClick={() => setDisplay("logs")}>Zurnalas</button>
      </div>
      {display == "users" && <Users />}
    </>
  );
}
