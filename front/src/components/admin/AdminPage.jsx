import React, { useState } from "react";
import Users from "./Users";
import Category from "./Category";
import { useGlobalCategoriesContext } from "../context/CategoriesContext";

export default function Admin() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        <button onClick={() => setDisplay("users")}>Vartotojai</button>
        <button onClick={() => setDisplay("logs")}>Žurnalas</button>
      </div>
      {display == "users" && <Users />}
      {display === "category" && <Category />}
    </>
  );
}
