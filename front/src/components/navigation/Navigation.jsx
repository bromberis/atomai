import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory, AiOutlineLock } from "react-icons/ai";
import { GiHistogram } from "react-icons/gi";
import { SiAtom } from "react-icons/si";
import { BiSortAlt2, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import { FiDownload } from "react-icons/fi";
import { CSVLink } from "react-csv";
import swal from "sweetalert";

export default function Navigation() {
  const { signOut, userData } = useGlobalUserContext(UserContext);
  function isDisabledAdmin() {
    if (userData.role === "user") {
      return `d-none`;
    }
  }
  function isDisabled() {
    if (!userData.hasOwnProperty("email")) {
      return `d-none`;
    }
  }
  let navigate = useNavigate();
  return (
    <div className="sideNav ">
      <nav className="text-center">
        <ul>
          <li className="logo">
            <Link
              to={
                userData != undefined && userData.hasOwnProperty("email")
                  ? "/incexp"
                  : "/"
              }
            >
              <button className={`navigation-button `}>
                <SiAtom color="#f4efe7" fontSize="3rem" />
              </button>
            </Link>
          </li>

          <li className={`${isDisabled()}`}>
            <Link to="/incexp">
              <button className={`navigation-button `}>
                <AiOutlineHome color="#f4efe7" fontSize="3rem" /> <p>Pradžia</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="/statistics">
              <button className={`navigation-button ${isDisabled()}`}>
                <GiHistogram color="#f4efe7" fontSize="3rem" />{" "}
                <p>Statistika</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="/limits">
              <button className={`navigation-button ${isDisabled()}`}>
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Limitai</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="/history">
              <button className={`navigation-button ${isDisabled()}`}>
                <AiOutlineHistory color="#f4efe7" fontSize="3rem" />{" "}
                <p>Istorija</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            {userData.expenses !== undefined && (
              <CSVLink
                data={userData.expenses}
                filename={"islaidos.csv"}
                target="_blank"
              >
                <button
                  className={`navigation-button custom-export ${isDisabled()}`}
                >
                  <FiDownload color="#f4efe7" fontSize="3rem" />{" "}
                  <p>Eksportuoti</p>
                </button>
              </CSVLink>
            )}
          </li>
          <li className={`${isDisabled()}`}>
            <button
              onClick={() => {
                swal({
                  title: "Ar tikrai atsijungti?",
                  icon: "warning",
                  buttons: ["Atšaukti", "Gerai"],
                }).then((isConfirm) => {
                  if (isConfirm) {
                    signOut();
                    navigate("/");
                  }
                });
                //signOut();
                // navigate("/");
              }}
              className={`navigation-button custom-export`}
            >
              <BiLogOut color="#f4efe7" fontSize="3rem" />
              <p>Atsijungti</p>
            </button>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="/admin">
              <button className={`navigation-button ${isDisabledAdmin()}`}>
                <AiOutlineLock color="#f4efe7" fontSize="3rem" /> <p>Admin</p>
              </button>
            </Link>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
}
