import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GiHistogram } from "react-icons/gi";
import { SiAtom } from "react-icons/si";
import { BiSortAlt2 } from "react-icons/bi";

export default function Navigation() {
  return (
    <div className="sideNav ">
      <nav className="text-center">
        <ul>
          <li className="logo">
            <Link to="/">
              <button className="navigation-button">
                <SiAtom color="#f4efe7" fontSize="3rem" />
              </button>
            </Link>
          </li>

          <li>
            <Link to="/">
              <button className="navigation-button">
                <AiOutlineHome color="#f4efe7" fontSize="3rem" /> <p>Pradžia</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button ">
                <GiHistogram color="#f4efe7" fontSize="3rem" />{" "}
                <p>Statistika</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button ">
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Limitai</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <button className="navigation-button ">
                <AiOutlineHistory color="#f4efe7" fontSize="3rem" />{" "}
                <p>Istorija</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="navigation-button custom-export">
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" />{" "}
                <p>Eksportuoti</p>
              </button>
            </Link>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
}
