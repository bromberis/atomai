import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GiHistogram, GiTakeMyMoney } from "react-icons/gi";
import { BiSortAlt2 } from "react-icons/bi";

export default function Navigation() {
  return (
    <div className="sideNav ">
      <nav className="text-center">
        <ul>
          <li className="logo">
            <Link to="/">
              <button className="navigation-button">
                <GiTakeMyMoney color="#F7F5F2" fontSize="3rem" />
              </button>
            </Link>
          </li>

          <li>
            <Link to="/">
              <button className="navigation-button">
                <AiOutlineHome color="#F7F5F2" fontSize="3rem" /> <p>Pradžia</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button ">
                <GiHistogram color="#F7F5F2" fontSize="3rem" /> <p>Statistika</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button ">
                <BiSortAlt2 color="#F7F5F2" fontSize="3rem" /> <p>Limitai</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <button className="navigation-button ">
                <AiOutlineHistory color="#F7F5F2" fontSize="3rem" /> <p>Istorija</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button custom-export">
                <BiSortAlt2 color="#F7F5F2" fontSize="3rem" /> <p>Eksportuoti</p>
              </button>
            </Link>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
}
