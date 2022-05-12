import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./NavigationMobile.css";
import { SiAtom } from "react-icons/si";

export default function NavigationMobile() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-small-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <SiAtom fontSize=" 2rem" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item text-center">
              <a className="nav-link" href="/">
                Pradžia
              </a>
            </li>

            <li className="nav-item text-center">
              <a className="nav-link" href="/statistics">
                Statistika
              </a>
            </li>
            <li className="nav-item text-center">
              <a className="nav-link" href="/">
                Limitai
              </a>
            </li>
            <li className="nav-item text-center">
              <a className="nav-link" href="/history">
                Istorija
              </a>
            </li>
            <li className="nav-item text-center no-border">
              <a className="nav-link" href="/history">
                Eksportavimas
              </a>
            </li>
            <li className="nav-item text-center no-border">
              <a className="nav-link" href="/">
                Atsijungti
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
