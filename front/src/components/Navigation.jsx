import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GiHistogram, GiTakeMyMoney } from "react-icons/gi";
import { BiSortAlt2 } from "react-icons/bi";

export default function Navigation() {
  return (
    <div className="sideNav vh-100 btn-group-vertical" style={{ backgroundColor: "rgb(33, 37, 41)" }}>
      <nav className="vh-100">
        <div className="logo">
          <Link to="/">
            <button className="btn btn-dark btn-lg rounded-0 " style={{ width: "100%", height: "100px" }}>
              <GiTakeMyMoney size={60} />
            </button>
          </Link>
        </div>

        <div>
          <Link to="/">
            <button className="btn btn-dark btn-lg rounded-0" style={{ width: "100%", height: "100px" }}>
              <AiOutlineHome size={30} /> <p>Pradžia</p>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button className="btn btn-dark btn-lg rounded-0 " style={{ width: "100%", height: "100px" }}>
              <GiHistogram size={30} /> <p>Statistika</p>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button className="btn btn-dark btn-lg rounded-0 " style={{ width: "100%", height: "100px" }}>
              <BiSortAlt2 size={30} /> <p>Limitai</p>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/history">
            <button className="btn btn-dark rounded-0 btn-lg " style={{ width: "100%", height: "100px" }}>
              <AiOutlineHistory size={30} /> <p>Istorija</p>
            </button>
          </Link>
        </div>
        <div style={{ height: "37vh" }}></div>
        <div className="align-items-end">
          <Link to="/">
            <button className="btn btn-dark btn-lg rounded-0" style={{ width: "100%", height: "100px" }}>
              <BiSortAlt2 size={30} /> <p>Limitai</p>
            </button>
          </Link>
        </div>
      </nav>{" "}
    </div>
  );
}
