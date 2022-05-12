import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { GiHistogram } from "react-icons/gi";
import { SiAtom } from "react-icons/si";
import { BiSortAlt2, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import swal from "sweetalert";
import CsvDownload from "react-json-to-csv";

export default function Navigation() {
  const { signOut, userData, exportJSON } = useGlobalUserContext(UserContext);

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
            <Link to={userData != undefined && userData.hasOwnProperty("email") ? "/incexp" : "/"}>
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
                <GiHistogram color="#f4efe7" fontSize="3rem" /> <p>Statistika</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="#">
              <button className={`navigation-button ${isDisabled()}`}>
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Limitai</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="/history">
              <button className={`navigation-button ${isDisabled()}`}>
                <AiOutlineHistory color="#f4efe7" fontSize="3rem" /> <p>Istorija</p>
              </button>
            </Link>
          </li>
          <li className={`${isDisabled()}`}>
            <Link to="#">
              <button onClick={() => exportJSON()} className={`navigation-button custom-export ${isDisabled()}`}>
                <BiSortAlt2 color="#f4efe7" fontSize="3rem" /> <p>Eksportuoti</p>
              </button>
            </Link>
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
            <Link to="/history">
              <CsvDownload
                data={userData.expenses}
                style={{
                  //pass other props, like styles
                  boxShadow: "inset 0px 1px 0px 0px #e184f3",
                  background: "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                  backgroundColor: "#c123de",
                  borderRadius: "6px",
                  border: "1px solid #a511c0",
                  display: "inline-block",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "6px 24px",
                  textDecoration: "none",
                  textShadow: "0px 1px 0px #9b14b3",
                }}
              />
              ;
            </Link>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
}
