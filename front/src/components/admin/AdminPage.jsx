import React, { useState } from "react";
import Users from "./Users";
import Category from "./Category";

import Logs from "./logs/Logs";

import "./Category.css";

import { useGlobalCategoriesContext } from "../context/CategoriesContext";

export default function Admin() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div className="container ">
        <div className="row ">
          <div className="col-11 d-flex justify-content-end border-custom p-0">
            <button
              className="btn-main-admin"
              onClick={() => setDisplay("category")}
            >
              Kategorijos
            </button>
            <button
              className="btn-main-admin"
              onClick={() => setDisplay("users")}
            >
              Vartotojai
            </button>
            <button
              className="btn-main-admin"
              onClick={() => setDisplay("logs")}
            >
              Žurnalas
            </button>
          </div>
          {display == "users" && <Users />}
          {display === "category" && <Category />}
        </div>
      </div>

      {display == "users" && <Users />}
      {display === "category" && <Category />}
      {display === "logs" && <Logs />}

    </>
  );
}
