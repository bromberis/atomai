import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GiHistogram } from "react-icons/gi";
import { SiAtom } from "react-icons/si";
import { BiSortAlt2 } from "react-icons/bi";
import { useGlobalUserContext, UserContext } from "../context/UserContext";

export default function Navigation() {
  const { signOut, userData } = useGlobalUserContext(UserContext);

  function isDisabled() {
    console.log(userData === undefined && userData.hasOwnProperty("email"));
    console.log(userData, userData.hasOwnProperty("email"));
    if (!userData.hasOwnProperty("email")) {
      return `d-none`;
    }
  }
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
            <Link to="/incexp">
              <button className="navigation-button">
                <AiOutlineHome color="#f4efe7" fontSize="3rem" /> <p>Pradžia</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/statistics">
              <button className="navigation-button ">
                <GiHistogram color="#f4efe7" fontSize="3rem" /> <p>Statistika</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <button className="navigation-button ">
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Limitai</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <button className={`navigation-button ${isDisabled()}`}>
                <AiOutlineHistory color="#f4efe7" fontSize="3rem" /> <p>Istorija</p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <button className="navigation-button custom-export">
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Eksportuoti</p>
              </button>
            </Link>
          </li>
          <li>
            <button onClick={() => signOut()}>Atsijungti</button>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
}
