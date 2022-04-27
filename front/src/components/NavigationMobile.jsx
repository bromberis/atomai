import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationMobile.css";
import { GiTakeMyMoney } from "react-icons/gi";

export default function NavigationMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <div>
        <button onClick={() => setOpenMenu(!openMenu)} className="btn border border-4 border-end-0">
          {" "}
          <GiTakeMyMoney fontSize="3rem" /> Meniu
        </button>
        {openMenu && (
          <ul>
            <li>
              <Link to="/">
                <button onClick={() => setOpenMenu(false)} className="btn border-bottom">
                  Pradžia
                </button>
              </Link>
            </li>
            <li>
              <Link to="/">
                <button onClick={() => setOpenMenu(false)} className="btn border-bottom">
                  Statistika
                </button>
              </Link>
            </li>
            <li>
              <Link to="/">
                <button onClick={() => setOpenMenu(false)} className="btn border-bottom">
                  Limitai
                </button>
              </Link>
            </li>
            <li>
              <Link to="/history">
                <button onClick={() => setOpenMenu(false)} className="btn border-bottom">
                  Istorija
                </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
